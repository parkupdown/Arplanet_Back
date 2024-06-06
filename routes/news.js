const express = require("express");
const { getNews, getNewsTotal } = require("../controller/NewsController");
const router = express.Router();

router.get(`/`, getNews);
router.get(`/total`, getNewsTotal);

module.exports = router;
