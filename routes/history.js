const express = require("express");
const history = require("../controller/HistoryController");
const router = express.Router();

router.get(`/`, history);

module.exports = router;
