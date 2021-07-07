const express = require('express')
const router = express.Router()

const {requireSignIn, isAuth} = require("../controllers/auth")
const {userById} = require("../controllers/user")
const {genToken, processPayment} = require("../controllers/braintree")

router.get('/braintree/getToken/:userId', requireSignIn, isAuth, genToken);
router.post('/braintree/payment/:userId', requireSignIn, isAuth, processPayment);

router.param('userId', userById)

module.exports = router
