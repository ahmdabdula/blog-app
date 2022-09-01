import { useLocation, useNavigate } from "react-router-dom";
import { blogType } from "../../Components/Blog/blog";
import backArrow from "../../Images/backArrow.png";

const BlogPage = () => {
  const location = useLocation();
  const state = location?.state as { path: string; blog: blogType };
  const { title, author, content, date } = state.blog;
  const dateString = date.toDateString();
  const splitDate = dateString?.split(" ", 4);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(state.path);
  };

  return (
    <div className="w-full pt-10 sm:pt-20 flex flex-col h-full lg:flex-row items-center lg:items-start">
      <div className="w-5/6 lg:w-1/6 lg:items-center flex flex-col mb-10 ">
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
      </div>
      <div className="w-5/6 sm:w-4/6 h-full leading-6 ">
        <div>
          <h1 className="font-dmSerif pb-6 text-2xl sm:text-5xl  text-primary">
            {title}
          </h1>
          <h1 className="font-lexend text:lg sm:text-xl font-light text-secondary">
            written by {author}
          </h1>
          <h1 className="font-lexend text:lg sm:text-xl font-light text-secondary">
            on {`${splitDate[2]} ${splitDate[1]}  ${splitDate[3]}`}
          </h1>
          <p className="font-lexend pt-4 text-lg pb-6 sm:text-xl font-light blog-content first-letter:text-8xl first-letter:ml-5 first-letter:font-medium">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
