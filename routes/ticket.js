const express = require("express");
const { getTicket } = require("../controller/TicketController");
const router = express.Router();

router.get(`/`, getTicket);

module.exports = router;
