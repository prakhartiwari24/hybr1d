const buyerAuth = require('../api/buyerAuth')
const handler = require('../api/handler')
const app = require('../app')
const router = require('express').Router()

router
.route('/register')
.post(buyerAuth.signUp)

router
.route('/login')
.post(buyerAuth.login)


router
.route('/list-of-sellers')
.get(handler.getAllSellers)


router
.route('/seller-catalog/:seller_id')
.get(handler.catalogBySellerId)

router
.route('/create-order/:seller_id')
.post(handler.createOrder)




module.exports = router