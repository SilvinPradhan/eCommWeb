const formidable = require("formidable")
const _ = require("lodash")
const fs = require('fs')
const Product = require("../models/product")
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: "Product not found"
                });
            }
            req.product = product
            next()
        })
}

exports.read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "The image could not be uploaded. Something wrong with the server."
            })
        }

        //Check for all fields
        const {name, description, price, category, quantity, shipping} = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All of the fields are to be filled."
            })
        }

        let product = new Product(fields)

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "The image should be less than 1MB."
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, removeProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            removeProduct,
            message: "Product has been deleted"
        })
    })
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "The image could not be uploaded. Something wrong with the server."
            })
        }

        //Check for all fields
        // const {name, description, price, category, quantity, shipping} = fields;
        //
        // if (!name || !description || !price || !category || !quantity || !shipping) {
        //     return res.status(400).json({
        //         error: "All of the fields are to be filled."
        //     })
        // }

        let product = req.product
        product = _.extend(product, fields)

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "The image should be less than 1MB."
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find().select("-photo").populate('category').sort([[sortBy, order]]).limit(limit).exec((err, products) => {
        if (err) {
            return res.status(400).json({
                error: 'Products not found'
            })
        }
        res.json(products)
    })

}


/**
 * Find products based on the request product category
 * other products that has the same category will be returned
 * */
exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    Product.find({
        _id: {$ne: req.product},
        category: req.product.category
    }).limit(limit).populate('category', '_id name').exec((err, products) => {
        if (err) {
            return res.status(400).json({
                error: 'Products not found'
            })
        }
        res.json(products)
    })
}

exports.listCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'Categories not found'
            })
        }
        res.json(categories)
    })
}

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
}

exports.photos = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.listSearch = (req, res) => {
    const query = {}
    if (req.query.search) {
        query.name = {$regex: req.query.search, $options: 'i'}
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category
        }
        //    find the product based on the query object with two properties
        //    search category
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(products)
        }).select('-photo')
    }
}

exports.decreaseQuantity = (req, res, next) => {
    let bulkOptions = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: {
                    _id: item._id
                },
                update: {
                    $inc: {quantity: -item.count, sold: +item.count}
                }
            }
        }
    })
    Product.bulkWrite(bulkOptions, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update product'
            })
        }
        next()
    })
}
