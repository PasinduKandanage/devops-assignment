const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;