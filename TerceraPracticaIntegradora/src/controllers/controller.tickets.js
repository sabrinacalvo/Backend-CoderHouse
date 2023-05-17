const { v4: uuidv4 } = require('uuid')
const { TicketDAO } = require("../dao/factory")

const Router = require('express');
const router = new Router();

const tm1 = TicketDAO;

router.get('/', async (req,res) => {
    try {
        const tickets = await tm1.getTickets();
        console.log(tickets)
         if(tickets === []) 
             res.json({ status: 'error', message: 'Non Tickets not found' });
         else 
             res.json({ status: 'success', message: tickets })
    } catch(error) {
        throw error;
    }
});

router.get('/:id', async (ticketId) => {
    try {
        const ticketById = await tm1.getTicketById(ticketId);
        if(Object.keys(ticketById).length === 0) return {message: 'Non ticket found with ID: ', ticketId};
        return {message: 'Ticket found', payload: ticketById};
    } catch(error) {
        throw error;
    }
});

router.post('/', async (req,res) => {
    const ticketInfo = req.body
    try {
        const tickets = await tm1.getTickets();
        console.log(tickets.length)
        let code;
        let uniqueCode = false;
        if (tickets.length != 0){
            while (uniqueCode === false) {
                code = uuidv4();
                uniqueCode = tickets.forEach(ticket => ticket.code === code) ? false : true;
            }
        }

        const actualDate = Date();
        const options = {dateStyle: 'short', timeStyle: 'short'};
        const purchase_datetime = actualDate.toLocaleString('es-AR', options);

        const newticketInfo = {
            code,
            purchase_datetime,
            total: ticketInfo.total,
            owner: ticketInfo.owner 
        };
        console.log("new ticket: ", newticketInfo)

        const data = await tm1.createTicket(newticketInfo);
        const newTicket = {
            code: data.code,
            purchase_datetime: data.purchase_datetime,
            total: data.total,
            owner: data.owner
        };

        return res.json({ status: 'success', message: data })
    } catch(error) {
        throw error;
    }
});

router.delete('/', async (res) => {
    await tm1.clearAll();
    res.json({ message: 'Tickets deleted' })
});

module.exports = router