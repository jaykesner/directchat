import { Global, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./routes/Chat";
import Home from "./routes/Home";

export default function App() {
  return (
    <MantineProvider
      styles={{
        Title: (theme) => ({
          root: {
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
          },
        }),
      }}
      theme={{
        colorScheme: "light",
        /*
        colors: {
          dark: [
            "#d5d7e0",
            "#acaebf",
            "#8c8fa3",
            "#666980",
            "#4d4f66",
            "#34354a",
            "#2b2c3d",
            "#1d1e30",
            "#0c0d21",
            "#01010a",
          ],
        },
        */
      }}
      withNormalizeCSS
      withGlobalStyles
    >
      <Global
        styles={(theme) => ({
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },

          body: {
            ...theme.fn.fontStyles(),
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[2],
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
          },
        })}
      />
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
