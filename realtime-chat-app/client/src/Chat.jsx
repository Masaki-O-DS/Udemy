import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const scrollBottomRef = useRef(null);

  useLayoutEffect(() => {
    if (scrollBottomRef && scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        author: userName,
        room: room,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList([...messageList, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log(data);
      setMessageList((prevList) => [...prevList, data]);
    };

    // リスナーの登録
    socket.on("receive_message", handleReceiveMessage);

    // クリーンアップ関数でリスナーを解除
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>ライブチャット</p>
      </div>
      <div className="chat-body">
        <div className="message-container">
          {messageList.map((messageContent, index) => (
            <div
              className="message"
              id={userName === messageContent.author ? "you" : "other"}
              key={index}
            >
              <div className="message-content">
                <p>{messageContent.message}</p>
              </div>
              <div className="message-meta">
                <p id="time">{messageContent.time}</p>
                <p id="author">{messageContent.author}</p>
              </div>
            </div>
          ))}
          <div ref={scrollBottomRef}></div>
        </div>
      </div>
      <div className="chat-footer">
        <input
          onChange={(e) => setCurrentMessage(e.target.value)}
          type="text"
          placeholder="メッセージ内容..."
          value={currentMessage}
        />
        <button onClick={() => sendMessage()}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
