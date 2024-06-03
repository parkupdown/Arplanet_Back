const { StatusCodes } = require("http-status-codes");
const { db } = require("../db");

const allArtists = async (req, res) => {
  const response = await db.collection(`artists`).findOne({ data: "artists" });
  if (!response) {
    return res.status(StatusCodes.NOT_FOUND).end();
  }
  return res.status(StatusCodes.OK).send(response);
};

module.exports = allArtists;
