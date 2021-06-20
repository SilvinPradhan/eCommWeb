const express = require("express");
const router = express.Router()
const {requireSignIn, isAuth, isAdmin} = require("../controllers/auth")

const {create} = require('../controllers/category')
const {userById} = require('../controllers/user')

router.post('/category/create/:userId', requireSignIn, isAdmin, isAuth, create);
router.param("userId", userById)

module.exports = router;
