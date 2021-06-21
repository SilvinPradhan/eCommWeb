const express = require("express");
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require("../controllers/auth")

const {create, productById, read, remove, update} = require('../controllers/product')
const {userById} = require('../controllers/user')

router.post('/product/create/:userId', requireSignIn, isAdmin, isAuth, create);
router.get('/product/:productId', read)
router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove
)
router.put('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, update)

router.param("userId", userById)
router.param("productId", productById)

module.exports = router;
