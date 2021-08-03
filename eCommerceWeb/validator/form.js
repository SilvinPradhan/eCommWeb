const {check} = require('express-validator/check')

exports.contactFormValidator = [
    check('firstName').not().isEmpty().withMessage('FirstName is required.'),
    check('email').isEmail().withMessage('Must be a valid email address.'),
    check('message').not().isEmpty().isLength({min: 20}).withMessage('Message must be at least 20 characters long.'),
]
