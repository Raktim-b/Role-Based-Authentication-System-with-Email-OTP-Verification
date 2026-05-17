require("dotenv").config();
const express = require("express");
const DbCon = require("./app/config/db");
const router = require("./app/routes/auth.routes");
const app = express();
DbCon();
app.use(express.json());
app.use("/", router);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server connected ${PORT}`);
});
