const mongoose = require('mongoose')
const Buyer = require('./buyerModel')
const Seller = require('./sellerModel')

const catalogSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, "Please enter a valid item name"]
    },
    itemQuantity: {
        type: Number,
        required: [true, "Please enter a quantity"]
    },
    itemPrice:{
        type: Number,
        required: [true, "Please enter a price"]
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,       
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})



const Catalog = mongoose.model('Catalog', catalogSchema)

module.exports = Catalog