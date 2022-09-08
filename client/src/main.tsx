import { render } from "preact";
import App from "./app";
import AppContextProvider from "./contexts/auth";
import "./styles/custom.scss";

render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.getElementById("app") as HTMLElement
);
