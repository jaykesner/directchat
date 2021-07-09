import logo from "../directchat-logo.jpg";
import { newChat, joinChat, randomChat } from "../firebase";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  let history = useHistory();

  const [roomId, setRoomId] = useState("");

  const addNewChat = async () => {
    const chatId = await newChat();
    console.log(`chatId ${chatId}`);
    history.push(`/${chatId}`);
  };

  const joinChatById = async () => {
    const chatRoom = await joinChat(roomId);
    if (chatRoom) {
      history.push(`/${roomId}`);
    }
    console.log(chatRoom);
  };

  const joinRandomChat = async () => {
    const randomChatId = await randomChat();
    if (randomChatId) {
      console.log(randomChatId);
      history.push(`/${randomChatId}`);
    } else {
      console.log("no chat rooms exist for random chat");
      const chatId = await newChat();
      history.push(`/${chatId}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>test room: XY1B2</div>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button className="Home-Button" onClick={() => joinChatById()}>
          JOIN
        </button>
        <button className="Home-Button" onClick={() => joinRandomChat()}>
          RANDOM
        </button>
        <button className="Home-Button" onClick={() => addNewChat()}>
          NEW
        </button>
      </header>
    </div>
  );
}
