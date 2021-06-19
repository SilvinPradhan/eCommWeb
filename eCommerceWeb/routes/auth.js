const express = require('express');
const router = express.Router()

const {signup, signin, signout, requireSignIn} = require('../controllers/auth')

const {userSignUpValidator} = require('../validator')

router.post('/signup', userSignUpValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout)

//API for RequireSignIn endpoint passed
router.get('/test', requireSignIn, (req, res) => {
    res.send('Testing user sign in "required" end point')
})

module.exports = router;
