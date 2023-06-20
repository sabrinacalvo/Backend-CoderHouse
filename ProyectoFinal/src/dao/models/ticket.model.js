const mongoose = require("mongoose");

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datetime: Date,
    total: Number,
    purchaser: String
});

const Ticket = mongoose.model(ticketCollection, ticketSchema);

module.exports = Ticket;