import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <Chat />
        </Route>
        <Route path="/test">
          <Chat />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
