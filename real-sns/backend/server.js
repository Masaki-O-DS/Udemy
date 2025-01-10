const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const mongoose = require("mongoose");
const PORT = 4000;
require("dotenv").config();

//DBとの接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DBと接続中・・・");
  })
  .catch((err) => {
    console.log(err);
  });

//API
app.get("/", (req, res) => {
  res.send("hello Express!!!");
});

//ミドルウェアの設定
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(PORT, () => console.log("サーバーが起動しました。"));
