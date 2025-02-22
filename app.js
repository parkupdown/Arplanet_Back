const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { dbRun } = require("./db");
app.listen(process.env.PORT, () => console.log("열림"));
app.use(
  cors({ origin: true, credentials: true, exposedHeaders: ["Authorization"] })
);
app.use(express.json());

dbRun();

const artistsRouter = require("./routes/artists.js");
const ceoRouter = require("./routes/ceo.js");
const historyRouter = require("./routes/history.js");
const concertRouter = require("./routes/concert.js");
const newsRouter = require("./routes/news.js");
const ticketRouter = require("./routes/ticket.js");
const loginRouter = require("./routes/login.js");
const adminRouter = require("./routes/admin.js");

app.use("/artists", artistsRouter);
app.use("/ceo", ceoRouter);
app.use("/history", historyRouter);
app.use("/concert", concertRouter);
app.use("/news", newsRouter);
app.use("/ticket", ticketRouter);
app.use("/login", loginRouter);
app.use("/admin", adminRouter);
