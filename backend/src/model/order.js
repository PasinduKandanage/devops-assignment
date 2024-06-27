const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_name: {
        type: String
    },
    ticket_id: {
        type: String,
        required: true,
    },
    ticket_name: {
        type: String
    },
    date: {
        type: String,
        required: true,
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;