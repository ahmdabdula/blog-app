import React from "react";
import { Routes, Route } from "react-router-dom";

import Authentication from "./routes/authentication/authentication";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Authentication />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
