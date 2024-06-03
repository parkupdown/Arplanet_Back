const { StatusCodes } = require("http-status-codes");
const { db } = require("../db");

const history = async (req, res) => {
  const response = await db.collection(`history`).findOne({ data: "history" });
  if (!response) {
    return res.status(StatusCodes.NOT_FOUND).end();
  }
  return res.status(StatusCodes.OK).send(response);
};

module.exports = history;
