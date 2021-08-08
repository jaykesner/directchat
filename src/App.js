import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Name from "./components/Name";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/name">
          <Name />
        </Route>
        <Route path="/:id">
          <Chat />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
