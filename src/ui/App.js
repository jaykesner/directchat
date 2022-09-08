import { Global, MantineProvider } from "@mantine/core";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./routes/Chat";
import Home from "./routes/Home";
import { lightTheme, darkTheme, darkTheme2 } from "./themes";

export default function App() {
  const [theme, setTheme] = useState();

  const selectTheme = (name) => {
    switch (name) {
      case "light":
        setTheme(lightTheme);
        break;
      case "dark":
        setTheme(darkTheme);
        break;
      case "dark2":
        setTheme(darkTheme2);
        break;
      default:
        break;
    }
  };

  return (
    <MantineProvider
      theme={theme}
      styles={{
        Title: (theme) => ({
          root: {
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
          },
        }),
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
            <Home selectTheme={selectTheme} />
          </Route>
        </Switch>
      </Router>
    </MantineProvider>
  );
}
