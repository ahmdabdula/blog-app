import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./Context/userContext";
import Home from "./Routes/HomePage/homePage";
import Login from "./Routes/Login/login";
import Signup from "./Routes/Signup/signup";
import ProtectedRoutes from "./Utils/ProtectedRoute/protectedRoute";

const App = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route element={<ProtectedRoutes currentUser={currentUser} />}>
        <Route path="/" element={<Home />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
