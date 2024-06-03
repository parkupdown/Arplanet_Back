const express = require("express");
const app = express();
const cors = require("cors");
app.listen(process.env.PORT, () => console.log("열림"));
app.use(cors({ origin: true }));
