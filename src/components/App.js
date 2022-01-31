import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Chat";
import Home from "./Home";
import Name from "./Name";

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
