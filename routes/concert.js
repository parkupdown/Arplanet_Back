const express = require("express");
const {
  getConcert,
  getConcertDataCount,
} = require("../controller/ConcertController");

const router = express.Router();

router.get(`/`, getConcert);
router.get(`/total`, getConcertDataCount);

module.exports = router;
