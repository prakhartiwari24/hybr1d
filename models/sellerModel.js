const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const validator = require('validator')


const sellerSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please enter a valid name"]
    },
    password: {
        type: String,
        minLength:8,    
        required: [true, 'Please provide a password'],    
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el){
            return el === this.password
        },
        message: 'Passwords are not the same!'
    }
    },
    orders: {
        type: Number,
    },
    catalog: [{
        type: String,
    }],
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
})

sellerSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined

    next()
})

sellerSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}

const Seller = mongoose.model('Seller', sellerSchema)

module.exports = Seller