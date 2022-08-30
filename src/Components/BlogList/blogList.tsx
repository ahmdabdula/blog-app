import Blog from "../Blog/blog";
import { blogType } from "../Blog/blog";

const BlogList = () => {
  const tempArray = ["1", "2", "3", "4", "5"];
  const tempBlog: blogType = {
    title: "15 Disadvantages Of Freedom And How You Can Workaround It.",
    date: "27 may 2022",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat. Duis auteirure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur. Excepteur sint occaecatcupidatat non proident, sunt in culpa qui officia deseruntmollit anim id est laborum",
    author: "@samurai2099",
    id: "123hjg3k13l1l2",
  };

  return (
    <div className="w-full items-center flex flex-col h-full">
      <div className="w-full max-h-full overflow-y-auto scroll-blogs flex flex-col items-center">
        <div className="flex w-5/6 pt-20 pb-4 sm:pb-10 flex-col items-center sm:items-start">
          <hr className="border-4 w-8 border-primary" />
          <h1 className="font-lexend text-xl md:text-3xl">Latest</h1>
        </div>
        {tempArray.map((key) => {
          return <Blog key={key} {...tempBlog} />;
        })}
      </div>
    </div>
  );
};

export default BlogList;
