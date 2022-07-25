const sellerAuth = require('../api/sellerAuth')
const app = require('../app')
const router = require('express').Router()
const handler = require('../api/handler')

router
.route('/register')
.post(sellerAuth.signUp)

router
.route('/login')
.post(sellerAuth.login)


router
.route('/create-catalog')
.post(handler.createCatalog)

router
.route('/orders/:seller_id')
.get(handler.getAllOrders)

module.exports = router