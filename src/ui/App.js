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
    <MantineProvider theme={theme} withNormalizeCSS withGlobalStyles>
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
