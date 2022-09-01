import Blog from "../Blog/blog";
import { blogType } from "../Blog/blog";

const BlogList = ({
  blogs,
  searchQuery,
}: {
  blogs: blogType[];
  searchQuery: string;
}) => {
  let filteredBlogs = blogs?.filter((blog) => {
    return blog.title
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase());
  });

  return (
    <div className="w-full items-center flex flex-col h-full">
      <div className="w-full max-h-full overflow-y-auto scroll-blogs flex flex-col items-center">
        <div className="flex w-5/6 pt-20 pb-4 sm:pb-10 flex-col items-center sm:items-start">
          <hr className="border-4 w-8 border-primary" />
          <h1 className="font-lexend text-xl md:text-3xl">Latest</h1>
        </div>
        {filteredBlogs.length > 0 &&
          filteredBlogs.map((blog, key) => {
            return <Blog key={key} {...blog} />;
          })}
      </div>
    </div>
  );
};

export default BlogList;
