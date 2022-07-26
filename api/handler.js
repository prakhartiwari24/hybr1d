const Buyer = require('../models/buyerModel')
const Seller = require('../models/sellerModel')
const Catalog = require('../models/catalogModel')
const Order = require('../models/orderModel')


exports.getAllSellers = async(req, res, next) => {
    const sellers = await Seller.find().select('userName')

    res.status(200).json({
        status: 'OK',
        data: {
            sellers
        }
    })
 
    console.log(sellers)
    next()

}

exports.createCatalog = async(req, res, next) => {
    const catalog = await Catalog.create({
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        seller: req.body.seller,
        itemPrice: req.body.price
    })

    res.status(201).json({
        status: 'created',
        data: {
            catalog
        }
    })

   
}


exports.catalogBySellerId = async(req, res, next) => {
    const {seller_id} = req.params

    const catalog = await Catalog.find({seller: seller_id})
    const results = await Catalog.find({seller: seller_id}).count()
   
    res.status(200).json({
        status: 'OK',
        results,       
        data: {
            catalog
        }
    })

}

exports.createOrder = async(req, res, next) => {
    const {seller_id} = req.params

    const order = await Order.create({
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        seller: seller_id,
        buyer: req.body.buyer,
    })

   
    await Seller.updateOne({_id:seller_id}, {$inc: {orders: +1}})
   
    res.status(201).json({
        status:'order created',
        data:{
            order
        }
    })
}

exports.getAllOrders = async(req, res, next) => {
    const {seller_id} = req.params

    const orders = await Order.find({seller: seller_id})
    const results = await Order.find({seller: seller_id}).count()


    res.status(200).json({
        status: 'success',
        results,
        data:{
            orders
        }        
    })
}

