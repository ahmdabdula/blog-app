import { Routes, Route } from "react-router-dom";

import Home from "./Routes/HomePage/homePage";
import Login from "./Routes/Login/login";
import Signup from "./Routes/Signup/signup";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
