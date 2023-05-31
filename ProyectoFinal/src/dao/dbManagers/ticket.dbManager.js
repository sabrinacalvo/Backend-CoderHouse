const Ticket = require("../models/ticket.model.js");

class TicketDbManager {

    createTicket = async (newTicketInfo) => {
        try {
            const newTicket = await Ticket.create(newTicketInfo);
            return newTicket;
        } catch(error) {
            console.log(error);
            throw error;
        }
    };

    getTickets = async () => {
        try {
            const ticketsList = await Ticket.find();
            return ticketsList;
        } catch(error) {
            console.log(error);
            throw error;
        }
    };

    getTicketById = async (ticketId) => {
        try {
            const ticket = await Ticket.findById(ticketId);
            return ticket? ticket : {};
        } catch(error) {
            console,log(error);
            throw error;
        }
    };

    clearAll = async () => {
        let result = await Ticket.deleteMany();
        return result;
    };
    
};

module.exports = TicketDbManager;