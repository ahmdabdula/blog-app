import { Routes, Route } from "react-router-dom";
import Home from "./Routes/HomePage/homePage";
import Login from "./Routes/Login/login";
import Signup from "./Routes/Signup/signup";
import ProtectedRoutes from "./Utils/ProtectedRoute/protectedRoute";
import BlogPage from "./Routes/BlogPage/blogPage";
import MyBlogs from "./Routes/MyBlogs/myBlogs";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/userContext";
import { BlogsContext, BLOG_ACTION_TYPES } from "./Context/blogContext";
import { getBlogs } from "./Utils/Firebase/firebase";
const App = () => {
  const { currentUser } = useContext(UserContext);
  const { dispatch } = useContext(BlogsContext);
  useEffect(() => {
    if (currentUser) {
      const func = async () => {
        const blogs = await getBlogs();
        dispatch({ type: BLOG_ACTION_TYPES.SET_BLOGS, payload: blogs });
      };
      func().catch();
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route element={<ProtectedRoutes currentUser={currentUser} />}>
        <Route path="/" element={<Home />} />
        <Route path=":id" element={<BlogPage />} />
        <Route path="myblogs" element={<MyBlogs />} />
      </Route>
    </Routes>
  );
};

export default App;
