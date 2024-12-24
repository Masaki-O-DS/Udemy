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

  //ルームに入る時のソケット設置
  //　受け取るのでon
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`ユーザーID:${socket.id}が${data}に参加しました！`);
  });

  //チャット専用ソケットの設定
  socket.on("send_message", (data) => {
    console.log(data);

    //クライアントに返すソケット通信（room番号を共有している人のみに返す）
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("ユーザーとの接続が切れました！" + "socket-id : " + socket.id);
  });
});

//PORT番号を指定してサーバーを起動
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
