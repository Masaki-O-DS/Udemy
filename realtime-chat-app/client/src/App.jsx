import { useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const joinRoom = () => {
    console.log(userName);
    console.log(room);
  };
  return (
    <div className="App">
      <div className="joinChatContainer">
        <h3>チャットに参加する</h3>
        <input
          type="text"
          placeholder="お名前"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="ルーム番号"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={() => joinRoom()}>ルームに参加</button>
      </div>
    </div>
  );
}

export default App;
