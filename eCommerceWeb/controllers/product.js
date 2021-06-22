const formidable = require("formidable")
const _ = require("lodash")
const fs = require('fs')
const Product = require("../models/product")
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
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
        const {name, description, price, category, quantity, shipping} = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All of the fields are to be filled."
            })
        }

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
    let limit = req.query.limit ? req.query.limit : 6

    Product.find().select("-photo").populate('category').sort([[sortBy, order]]).limit(limit).exec((err, products) => {
        if (err) {
            return res.status(400).json({
                error: 'Products not found'
            })
        }
        res.send(products)
    })

}
