import React from "react";
import { Routes, Route } from "react-router-dom";

import Authentication from "./Routes/Authentication/authentication";
import Login from "./Routes/login/Login";
import Signup from "./Routes/signup/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Authentication />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default App;
