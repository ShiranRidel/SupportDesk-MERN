const express = require("express");
const router = express.Router({ mergeParams: true });
const { getNotes, addNote } = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, addNote);

module.exports = router;

//we want the route to be /api/tickets/:ticketId/note
//we have to handle the ticketRoute for that
