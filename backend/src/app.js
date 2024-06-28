require('dotenv').config()
const express = require('express')
const app = express()
const createHttpError = require('http-errors')
const BuyerRouter = require('./routes/buyer')
const CompanyRouter = require('./routes/admin')
const ProductRouter = require('./routes/tickets')
const OrderRouter = require('./routes/order')
const fileUpload = require('express-fileupload');

app.use(fileUpload());

app.use('/public/tickets', express.static('public/tickets'))

//cors
const cors = require('cors')
app.use(cors())

app.use(express.json())

app.use('/api/v1/users', BuyerRouter);
app.use('/api/v1/admin', CompanyRouter);
app.use('/api/v1/tickets', ProductRouter)
app.use('/api/v1/orders', OrderRouter)

app.use((err, req, res, next) => {
    if (createHttpError.isHttpError(err)) {
        res.status(err.status).send({ message: err.message })
    } else {
        res.status(500).send({ message: err.message })
    }
    //error unknown
    res.status(500).send({ message: "Error Unknown" })
})

app.get('/',(req,res)=>{
    res.send('good morning!!!')
})
module.exports = app;