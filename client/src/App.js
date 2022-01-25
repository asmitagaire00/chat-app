import "./App.css";
import io from "socket.io-client";
import React, { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomID] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Chat App</h3>
          <input
            type="text"
            placeholder="Ram"
            onChange={(event) => setUserName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => setRoomID(event.target.value)}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} roomId={roomId} />
      )}
    </div>
  );
}

export default App;
