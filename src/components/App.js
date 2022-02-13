import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Chat";
import Home from "./Home";

export default function App() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Router>
        <Switch>
          <Route path="/:id">
            <Chat />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </MantineProvider>
  );
}
