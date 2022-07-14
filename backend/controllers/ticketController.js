const asyncHandler = require("express-async-handler");

const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "getTickets" });
});

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTickets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "createTicket" });
});

module.exports = {
  getTickets,
  createTickets,
};
