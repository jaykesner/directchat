import { Global, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./routes/Chat";
import Home from "./routes/Home";
import { lightTheme, darkTheme, darkTheme2 } from "./themes";

export default function App() {
  const [themeStyle, setThemeStyle] = useLocalStorage({
    key: "theme",
  });
  const [theme, setTheme] = useState();

  useEffect(() => {
    selectTheme(themeStyle);
  });

  const selectTheme = (name) => {
    switch (name) {
      case "light":
        setTheme(lightTheme);
        setThemeStyle("light");
        break;
      case "dark":
        setTheme(darkTheme);
        setThemeStyle("dark");
        break;
      case "dark2":
        setTheme(darkTheme2);
        setThemeStyle("dark2");
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
            <Home selectTheme={selectTheme} themeStyle={themeStyle} />
          </Route>
        </Switch>
      </Router>
    </MantineProvider>
  );
}
