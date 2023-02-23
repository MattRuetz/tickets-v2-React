const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Ticket = require('../models/ticketModel');

// @desc get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access PRIVATE
const getNotes = asyncHandler(async (req, res) => {
    // Get notes with ticketId
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized.');
    }

    const notes = await Note.find({ ticket: req.params.ticketId });

    res.status(200).json(notes);
});

// @desc create note for a ticket
// @route POST /api/tickets/:ticketId/notes
// @access PRIVATE
const addNote = asyncHandler(async (req, res) => {
    // create note
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized.');
    }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id,
    });

    res.status(200).json(note);
});

// PRACTICE -- ADD DELETE NOTE FUNCTIONALITY (started below)
// 1. give Notes a unique ID in noteModel.js by ref'ing the mongoDB _id (like for tickets)
// 2. add deleteNote API method BELOW
// 3. reference this method in express Router in noteRoutes.js
// 4. Test note deletion in Postman
// 5. Add

// @desc delete note for a ticket
// @route DELETE /api/tickets/:ticketId/notes
// @access PRIVATE
// const deleteNote = asyncHandler(async (req, res) => {
//     // create note
//     const user = await User.findById(req.user.id);

//     if (!user) {
//         res.status(401);
//         throw new Error('User not found');
//     }

//     const ticket = await Ticket.findById(req.params.ticketId);

//     if (ticket.user.toString() !== req.user.id) {
//         res.status(401);
//         throw new Error('User not authorized.');
//     }

//     // Get NOTE from URL! (params)
//     const note = await Note.find({});

//     if (!ticket) {
//         res.status(404);
//         throw new Error('Ticket not found');
//     }

//     if (ticket.user.toString() !== req.user.id) {
//         res.status(401);
//         throw new Error('Not authorized');
//     }

//     await ticket.remove();

//     res.status(200).json(note);
// });

module.exports = {
    getNotes,
    addNote,
};
