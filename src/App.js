import logo from "./directchat-logo.jpg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" value="XYA1B" />
        <button>JOIN</button>
        <button>RANDOM</button>
        <button>NEW</button>
      </header>
    </div>
  );
}

export default App;
