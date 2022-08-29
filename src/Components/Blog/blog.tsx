import { Link } from "react-router-dom";

export type blogType = {
  title: string;
  date: string;
  author: string;
  content: string;
};

const Blog = ({ title, date, author, content }: blogType) => {
  return (
    <div className="my-10 md:pr-10 w-5/6">
      <h1 className="font-lexend pb-6 font-black text:2xl sm:text-4xl hidden sm:block">
        {date}
      </h1>
      <h1 className="font-dmSerif pb-6 text-3xl sm:text-5xl text-primary">
        {title}
      </h1>
      <h1 className="font-lexend pt-4 text-xl pb-6 sm:text-3xl  font-light blog-content">
        {content.length > 150 ? content.slice(0, 150) : content}
        {content.length > 150 && (
          <Link to="">
            <span className="text-primary">...read more </span>
          </Link>
        )}
      </h1>
      <div className="flex justify-between">
        <h1 className="font-lexend pb-6 font-black text:xl sm:text-4xl block sm:hidden">
          {date}
        </h1>
        <h1 className="font-lexend text:xl sm:text-2xl font-light text-secondary">
          {author}
        </h1>
      </div>
    </div>
  );
};

export default Blog;
