import { useContext, useState } from "react";
import BlogList from "../../Components/BlogList/blogList";
import TaskBar from "../../Components/TaskBar/taskBar";
import { BlogsContext } from "../../Context/blogContext";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { blogs } = useContext(BlogsContext);

  return (
    <div className="h-full lg:flex">
      <TaskBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BlogList Children={null} blogs={blogs ?? []} searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
