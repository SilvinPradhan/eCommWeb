const express = require('express');
const router = express.Router()

const {contactForm} = require('../controllers/form')

const {runValidation} = require('../validator/validate')
const {contactFormValidator} = require('../validator/form')

router.post('/contact', runValidation, contactFormValidator, contactForm);

module.exports = router;
