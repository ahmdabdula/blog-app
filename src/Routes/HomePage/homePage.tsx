import BlogList from "../../Components/BlogList/blogList";
import TaskBar from "../../Components/TaskBar/taskBar";
const Home = () => {
  return (
    <div className="h-full lg:flex">
      <TaskBar />
      <BlogList />
    </div>
  );
};

export default Home;
