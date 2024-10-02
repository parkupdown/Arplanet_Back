const { StatusCodes } = require("http-status-codes");
const { db } = require("../db");

const getAdminNews = async (req, res) => {
  const news = await db.collection("news").find().sort({ date: -1 }).toArray();
  return res.status(StatusCodes.OK).json({ data: news });
};

const insertAdminNews = async (req, res) => {
  const { title, media, date, url } = req.body;
  await db
    .collection("news")
    .insertOne({ title: title, media: media, date: date, url: url });
  return res.status(StatusCodes.OK).end();
};

module.exports = { getAdminNews, insertAdminNews };
