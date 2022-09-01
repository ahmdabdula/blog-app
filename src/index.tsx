import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Context/userContext";
import { BlogsProvider } from "./Context/blogContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <BlogsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BlogsProvider>
    </UserProvider>
  </React.StrictMode>
);
