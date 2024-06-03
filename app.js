const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { db, dbRun } = require("./db");
app.listen(process.env.PORT, () => console.log("열림"));
app.use(cors({ origin: true }));
app.use(express.json());
dbRun();

const artistsRouter = require("./routes/artists.js");
const ceoRouter = require("./routes/ceo.js");
/*
const getName = async () => {
  const name = await db.collection(`user`).findOne({ name: "whynot" });
  console.log(name);
};
getName();
*/

app.use("/artists", artistsRouter);
app.use("/ceo", ceoRouter);
