const dotenv = require('dotenv').config()

const Seller = require('../models/sellerModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN  * 24 * 60 * 60 * 1000),
        httpOnly: true
    } 
    res.cookie('jwt', token, cookieOptions)

    user.password = undefined

    res.status(statusCode).json({
        status:"success",
        token,
        data: {
            user
        }
    })
}

exports.signUp = async(req, res, next) => {
    const newUser = await Seller.create({
        userName: req.body.name,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    })

    createSendToken(newUser, 201, res)
}

exports.login = async(req, res, next) => { 
    const {userName, password} = req.body
    if(!userName || !password){
        return next(new Error("Please provide username and password", 400))
    }
    const user = await Seller.findOne({userName}).select('+password')

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new Error("Incorrect username or password", 401))
    }
     createSendToken(user, 200, res)
} 