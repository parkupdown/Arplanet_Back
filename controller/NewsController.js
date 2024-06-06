const { StatusCodes } = require("http-status-codes");
const { db } = require("../db");

const getNews = async (req, res) => {
  let { page, sort } = req.query;

  let news;

  if (page === "1") {
    news = await db
      .collection("news")
      .find()
      .limit(10)
      .sort({ date: 1 })
      .toArray();
  } else if (page !== "1") {
    news = await db.collection("news").find().skip(10).limit(10).toArray();
  }

  if (sort === "DESC") {
    news.reverse();
  }

  if (!news) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
  return res.status(StatusCodes.OK).send(news);
};

const getNewsTotal = async (req, res) => {
  const newsTotalLength = (await db.collection("news").find().toArray()).length;
  if (!newsTotalLength) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
  return res.status(StatusCodes.OK).json({ total: newsTotalLength });
};

module.exports = { getNews, getNewsTotal };
