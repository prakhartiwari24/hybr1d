const express = require('express')
const bodyParser = require('body-parser')
const buyerRoutes = require('./routes/buyerRoute')
const sellerRoutes= require('./routes/sellerRoute')
const mongoose = require('mongoose')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/buyer', buyerRoutes)
app.use('/api/seller', sellerRoutes)

app.use('/api/auth/buyer', buyerRoutes)
app.use('/api/auth/seller', sellerRoutes)


const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(() => {
    console.log('Database connection established')
})



app.listen(port, () => {
    console.log('listening on port ' + port)
})

module.exports = app