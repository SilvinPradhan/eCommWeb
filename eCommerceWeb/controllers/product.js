const formidable = require("formidable")
const _ = require("lodash")
const fs = require('fs')
const Product = require("../models/product")
const {errorHandler} = require("../helpers/dbErrorHandler");

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
