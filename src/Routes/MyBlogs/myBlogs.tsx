import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogList from "../../Components/BlogList/blogList";
import TaskBar from "../../Components/TaskBar/taskBar";
import { BlogsContext } from "../../Context/blogContext";
import { UserContext } from "../../Context/userContext";
import backArrow from "../../Images/backArrow.png";

const MyBlogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useContext(UserContext);
  const { blogs } = useContext(BlogsContext);
  const navigate = useNavigate();
  const userBlogs = blogs?.filter((blog) => {
    return blog.userId === currentUser?.uid;
  });

  const handleBackClick = () => {
    navigate("/");
  };

  const backButton = () => {
    return (
      <button onClick={handleBackClick}>
        <h1 className="font-dmSerif text-lg sm:text-2xl text-dark text-left lg:-ml-1">
          Back
        </h1>
        <img
          src={backArrow}
          className="w-14 sm:w-20 lg:w-24 -ml-4 -mt-2 sm:-ml-6 sm:-mt-2 lg:-ml-6 lg:-mt-3"
          alt="arrow"
        />
      </button>
    );
  };

  return (
    <div className="h-full lg:flex">
      <TaskBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BlogList
        Children={backButton}
        blogs={userBlogs ?? []}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default MyBlogs;
