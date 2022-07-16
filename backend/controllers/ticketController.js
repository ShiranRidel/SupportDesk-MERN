const asyncHandler = require("express-async-handler");

const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  //GET user using the id in the JWT
  const user = await User.findById(req.user.id);

  // Check if not user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //get the tickets
  const tickets = await Ticket.find({ user: req.user.id });
  //send a response
  res.status(200).json(tickets);
});

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTickets = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description ");
  }
  //GET user using the id in the JWT
  const user = await User.findById(req.user.id);

  // Check if not user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //create the ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  //201 because its a created
  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  createTickets,
};
