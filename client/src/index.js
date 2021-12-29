import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css"
import React from "react";
import { positions, Provider as AlertProvider, transitions } from "react-alert";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import Alert from "./components/Alert";
import AuthContextProvider from "./contexts/AuthContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "10px",
  transition: transitions.FADE,
};

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertProvider template={Alert} {...options}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </AlertProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
