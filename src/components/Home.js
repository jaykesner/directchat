import logo from "../directchat-logo.jpg";
import { newChat } from "../firebase";
import { useHistory } from "react-router-dom";

export default function Home() {
  let history = useHistory();

  const addNewChat = async () => {
    const chatId = await newChat();
    console.log(`chatId ${chatId}`);
    history.push(`/${chatId}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" defaultValue="XYA1B" />
        <button className="Home-Button">JOIN</button>
        <button className="Home-Button">RANDOM</button>
        <button className="Home-Button" onClick={() => addNewChat()}>
          NEW
        </button>
      </header>
    </div>
  );
}
