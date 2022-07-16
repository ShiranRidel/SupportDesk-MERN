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

// @desc    Get user ticket - single ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  //GET user using the id in the JWT
  const user = await User.findById(req.user.id);

  // Check if not user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //get the tickets from the url
  const ticket = await Ticket.findById(req.params.id);

  // Check if not ticket
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  //only the user get his ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  //send a response
  res.status(200).json(ticket);
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

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id (id of ticket)
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  //GET user using the id in the JWT
  const user = await User.findById(req.user.id);

  // Check if not user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //get the tickets from the url
  const ticket = await Ticket.findById(req.params.id);

  // Check if not ticket
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  //only the user get his ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await ticket.remove();

  //send a response
  res.status(200).json({ success: true });
});

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  //GET user using the id in the JWT
  const user = await User.findById(req.user.id);

  // Check if not user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //get the tickets from the url
  const ticket = await Ticket.findById(req.params.id);

  // Check if not ticket
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  //only the user get his ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  //{new:true} - if the ticket not there then create it
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  //send a response
  res.status(200).json(updatedTicket);
});


module.exports = {
  getTickets,
  createTickets,
  getTicket,
  deleteTicket,
  updateTicket,
};
