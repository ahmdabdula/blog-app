import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import BlogList from "../../Components/BlogList/blogList";
import TaskBar from "../../Components/TaskBar/taskBar";
import { BlogsContext } from "../../Context/blogContext";
import { UserContext } from "../../Context/userContext";

const MyBlogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useContext(UserContext);
  const { blogs } = useContext(BlogsContext);
  const userBlogs = blogs?.filter((blog) => {
    return blog.userId === currentUser?.uid;
  });

  return (
    <div className="h-full lg:flex">
      <TaskBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BlogList blogs={userBlogs ?? []} searchQuery={searchQuery} />
    </div>
  );
};

export default MyBlogs;
