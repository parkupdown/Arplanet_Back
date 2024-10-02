const express = require("express");
const { checkJwt } = require("../controller/AdminController");
const {
  getAdminNews,
  insertAdminNews,
} = require("../controller/AdminNewsController");
const router = express.Router();

router.get(`/check`, checkJwt);
router.get(`/news`, getAdminNews).post(`/news`, insertAdminNews);
module.exports = router;
