import { useLocation } from "react-router-dom";
import Blog from "../Blog/blog";
import { blogType } from "../Blog/blog";
import Spinner from "../Spinner/spinner";

const BlogList = ({
  blogs,
  searchQuery,
  Children,
}: {
  blogs: blogType[];
  searchQuery: string;
  Children: React.ElementType | null;
}) => {
  blogs.sort(function (a, b) {
    return b.date.getTime() - a.date.getTime();
  });
  let filteredBlogs = blogs?.filter((blog) => {
    return blog.title
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase());
  });
  const location = useLocation();
  console.log(location.pathname);
  const pageTitle = location.pathname === "/myblogs" ? "My Blogs" : "Latest";

  return (
    <div className="w-full items-center flex flex-col h-full">
      <div className="w-full max-h-full overflow-y-auto scroll-blogs flex flex-col items-center">
        {Children && (
          <div className="flex w-5/6 pt-4 sm:-pb-16 flex-col sm:items-start">
            <Children className="mb-10" />
          </div>
        )}
        <div className="flex w-5/6 pt-20 pb-4 sm:pb-10 flex-col items-center sm:items-start">
          <hr className="border-4 w-8 border-primary" />
          <h1 className="font-lexend text-xl md:text-3xl">{pageTitle}</h1>
        </div>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, key) => {
            return <Blog key={key} blog={blog} />;
          })
        ) : (
          <div className="scale-150">
            <Spinner visible />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
