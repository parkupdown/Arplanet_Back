const express = require("express");
const { checkJwt } = require("../controller/AdminController");
const { getAdminNews } = require("../controller/AdminNewsController");
const router = express.Router();

router.get(`/check`, checkJwt);
router.get(`/news`, getAdminNews);
module.exports = router;
