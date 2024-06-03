const express = require("express");
const allArtists = require("../controller/ArtistsController");
const router = express.Router();

router.get(`/`, allArtists);

module.exports = router;
