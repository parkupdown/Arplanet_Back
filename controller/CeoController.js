const { StatusCodes } = require("http-status-codes");
const { db } = require("../db");

const ceo = async (req, res) => {
  const response = await db.collection(`ceo`).findOne({ data: "ceo" });
  if (!response) {
    return res.status(StatusCodes.NOT_FOUND).end();
  }
  return res.status(StatusCodes.OK).send(response);
};

module.exports = ceo;
