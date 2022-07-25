const mongoose = require('mongoose')
const Buyer = require('./buyerModel')
const Seller = require('./sellerModel')

const orderSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, "Please enter a valid item name"]
    },
    itemQuantity: {
        type: Number,
        required: [true, "Please enter a quantity"]
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,     
        ref: 'Seller',  
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer', 
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

orderSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'seller',
      select: 'name _id'
    }).populate({
      path: 'buyer',
      select: 'name _id'
    }); 
    
    next();
  });

const Order = mongoose.model('Order', orderSchema)

module.exports = Order