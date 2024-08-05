const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const { db } = require("../db");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { id, pw } = req.query;
  if (!id || !pw) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }

  const admin = await db.collection("admin").findOne();
  const hashPw = crypto
    .pbkdf2Sync(pw, admin.salt, 10000, 10, process.env.ALGORITHM)
    .toString("base64");

  if (hashPw === admin.pw && id === admin.id) {
    const token = makeJwt(admin.id, admin.nick);
    res.setHeader(`Authorization`, token);
    return res.status(StatusCodes.OK).end();
  }
  return res.status(StatusCodes.UNAUTHORIZED).end();
};

const makeJwt = (id, nick) => {
  const token = jwt.sign({ id: id, nick: nick }, process.env.SECRET_KEY, {
    expiresIn: "30m",
    issuer: "updownpark",
  });
  return token;
};

module.exports = login;
