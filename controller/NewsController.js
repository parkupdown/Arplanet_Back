const { StatusCodes } = require("http-status-codes");
const { db } = require("../db");

const getNews = async (req, res) => {
  let { page, sort } = req.query;

  let news;
  // sort가 ASC면
  // 낮은거부터 정렬후
  // sort가 DESC면
  // 높은거부터 정렬후
  if (sort === "ASC") {
    switch (page) {
      case "1": {
        news = await db
          .collection("news")
          .find()
          .sort({ date: 1 })
          .limit(10)
          .toArray();
        break;
      }
      default: {
        news = await db
          .collection("news")
          .find()
          .sort({ date: 1 })
          .skip((page - 1) * 10)
          .limit(10)
          .toArray();
      }
    }
  } else if (sort === "DESC") {
    switch (page) {
      case "1": {
        news = await db
          .collection("news")
          .find()
          .sort({ date: -1 })
          .limit(10)
          .toArray();
        break;
      }
      default: {
        news = await db
          .collection("news")
          .find()
          .sort({ date: -1 })
          .skip((page - 1) * 10)
          .limit(10)
          .toArray();
      }
    }
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
