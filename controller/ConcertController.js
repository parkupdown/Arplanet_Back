const { StatusCodes } = require("http-status-codes");
const { db } = require("../db");

const makeCurrent = () => {
  const date = new Date();
  const currentY = String(date.getFullYear());
  const currentM = String(date.getMonth() + 1).padStart(2, "0");
  const currentD = String(date.getDate()).padStart(2, "0");

  return `${currentY}-${currentM}-${currentD}`;
};

const makeCondition = (plan, status, year) => {
  let condition = {};
  if (plan !== "all") {
    condition.plan = plan;
  }
  if (year !== "all") {
    condition.year = year;
  }
  if (status !== "all") {
    if (status === "proceeding") {
      condition.date = { $gte: makeCurrent() };
    } else if (status === "ended") {
      condition.date = { $lt: makeCurrent() };
    }
  }
  return condition;
};

const getConcert = async (req, res) => {
  let { plan, status, year, page } = req.query;
  // date정보를 가져와서
  // all이면 아예 객체에 넣지않음
  const findCondition = makeCondition(plan, status, year);
  let concert;

  if (page === "1") {
    concert = await db
      .collection("concerts")
      .find(findCondition)
      .limit(8)
      .toArray();
  } else if (page !== "1") {
    concert = await db
      .collection("concerts")
      .find(findCondition)
      .skip(page - 1 * 8)
      .limit(8)
      .toArray();
  }
  if (!concert) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
  return res.status(StatusCodes.OK).send(concert);
};

const getConcertDataCount = async (req, res) => {
  const allData = (await db.collection("concerts").find().toArray()).length;

  if (!allData) {
    return res.status(StatusCodes.NOT_FOUND).end();
  }
  return res.status(StatusCodes.OK).json({ total: allData });
};

module.exports = { getConcert, getConcertDataCount };
