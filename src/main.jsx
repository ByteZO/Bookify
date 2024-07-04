import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FireBaseProvider } from "./Context/FireBaseContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FireBaseProvider>
        <App />
      </FireBaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
