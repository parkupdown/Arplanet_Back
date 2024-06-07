const { StatusCodes } = require("http-status-codes");
const { db } = require("../db");
const { makeCurrent } = require("./ConcertController");

const makeCondition = (plan) => {
  let condition = {};
  if (plan !== "all") {
    condition.plan = plan;
  }
  condition.date = { $gte: makeCurrent() };
  return condition;
};

const getTicket = async (req, res) => {
  let { plan } = req.query;

  const findCondition = makeCondition(plan);

  const ticket = await db
    .collection("concerts")
    .find(findCondition)
    .sort({ date: -1 })
    .toArray();
  if (!ticket) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
  return res.status(StatusCodes.OK).send(ticket);
};

module.exports = { getTicket };
