import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const PORT = 4000;

//　"/"はエンドポイント
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

io.on("connection", (socket) => {
  console.log("ユーザーと接続しました！" + "socket-id : " + socket.id);

  socket.on("disconnect", () => {
    console.log("ユーザーとの接続が切れました！" + "socket-id : " + socket.id);
  });
});

//PORT番号を指定してサーバーを起動
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
