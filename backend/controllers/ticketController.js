const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc get user tickets
// @route GET /api/tickets
// @access PRIVATE
const getTickets = asyncHandler(async (req, res) => {
    // Get user by ID in jwt
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const tickets = await Ticket.find({ user: req.user.id });

    res.status(200).json(tickets);
});

// @desc get user ticket
// @route GET /api/tickets/:id
// @access PRIVATE
const getTicket = asyncHandler(async (req, res) => {
    // Get user by ID in jwt
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Get ticket ID from URL! (params)
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    res.status(200).json(ticket);
});

// @desc get current user
// @route POST /api/tickets
// @access PRIVATE
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;

    if (!product || !description) {
        res.status(400);
        throw new Error('Plsease add a product and description');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.create({
        product,
        description,
        user,
        status: 'new',
    });

    res.status(201).json(ticket);
});

// @desc delete ticket
// @route DELETE /api/tickets/:id
// @access PRIVATE
const deleteTicket = asyncHandler(async (req, res) => {
    // Get user by ID in jwt
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Get ticket ID from URL! (params)
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await ticket.remove();

    res.status(200).json({ success: true });
});

// @desc update ticket
// @route PUT /api/tickets/:id
// @access PRIVATE
const updateTicket = asyncHandler(async (req, res) => {
    // Get user by ID in jwt
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Get ticket ID from URL! (params)
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } //if non-existent, create
    );

    res.status(200).json(updatedTicket);
});

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket,
};
