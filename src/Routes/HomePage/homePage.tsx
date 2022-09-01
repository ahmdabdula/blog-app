import { useContext, useEffect, useState } from "react";
import BlogList from "../../Components/BlogList/blogList";
import TaskBar from "../../Components/TaskBar/taskBar";
import { BlogsContext, BLOG_ACTION_TYPES } from "../../Context/blogContext";
import { getBlogs } from "../../Utils/Firebase/firebase";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { dispatch, blogs } = useContext(BlogsContext);

  useEffect(() => {
    const func = async () => {
      const blogs = await getBlogs();
      dispatch({ type: BLOG_ACTION_TYPES.SET_BLOGS, payload: blogs });
    };
    func().catch(console.error);
  }, []);

  return (
    <div className="h-full lg:flex">
      <TaskBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BlogList blogs={blogs ?? []} searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
