const { StatusCodes } = require("http-status-codes");
const { db } = require("../db");
const { makeCurrent } = require("./ConcertController");

const getTicket = async (req, res) => {
  const ticket = await db
    .collection("concerts")
    .find({ date: { $gte: makeCurrent() } })
    .sort({ date: -1 })
    .toArray();
  if (!ticket) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
  return res.status(StatusCodes.OK).send(ticket);
};

module.exports = { getTicket };
