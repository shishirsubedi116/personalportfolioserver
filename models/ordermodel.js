const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
    },
    pricing: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    description:{
        type: String,
        required: true
    },
    orderId: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        default:"Incomplete" ,
    },
    orderedAt:{
        type : Date,
        default :Date.now()
    }
})



// we will create a new collection
const Order = new mongoose.model('Order', orderSchema)

module.exports = Order;