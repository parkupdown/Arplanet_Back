const express = require("express");
const login = require("../controller/LoginController");
const router = express.Router();

router.get(`/`, login);

module.exports = router;
