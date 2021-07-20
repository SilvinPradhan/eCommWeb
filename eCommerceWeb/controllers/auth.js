const Auth = require('../models/user')
const jwt = require('jsonwebtoken') // generate signed token
const expressJWT = require('express-jwt') // for authorization
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.signup = (req, res) => {
    console.log("req body", req.body);
    const user = new Auth(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        })
    })
}

exports.signin = (req, res) => {
//    find the user based on the email
    const {
        email,
        password
    } = req.body;
    Auth.findOne({email}, (err, user) => {
        if (err || !user) return res.status(400).json({error: 'Auth with that email does not exist. Please sign up.'});
        //   If user is found make sure the email and password match
        //  create authentication method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password does not match'
            })
        }
        //  generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, 'icuDummies2595')
        //    persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        //    return response the user and token to frontend client
        const {_id, firstName, lastName, username, email, role} = user;
        return res.json({
            token, user: {_id, firstName, lastName, username, email, role}
        })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({message: 'Sign out successful.'})
}

exports.requireSignIn = expressJWT({
    secret: `${process.env.JWT_SECRET}`,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resource. Access denied!"
        })
    }
    next()
}
