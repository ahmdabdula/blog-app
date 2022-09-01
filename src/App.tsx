import { Routes, Route } from "react-router-dom";
import Home from "./Routes/HomePage/homePage";
import Login from "./Routes/Login/login";
import Signup from "./Routes/Signup/signup";
import ProtectedRoutes from "./Utils/ProtectedRoute/protectedRoute";
import BlogPage from "./Routes/BlogPage/blogPage";
import MyBlogs from "./Routes/MyBlogs/myBlogs";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path=":id" element={<BlogPage />} />
        <Route path="myblogs" element={<MyBlogs />} />
      </Route>
    </Routes>
  );
};

export default App;
