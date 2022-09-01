import { Link, useLocation } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useContext, useState } from "react";
import CreateBlog from "../CreateBlog/createBlog";
import ConfirmAlert from "../Alerts/confirmationAlert";
import { deletBlog, getBlogs } from "../../Utils/Firebase/firebase";
import GenericAlert from "../Alerts/genericAlert";
import { BlogsContext, BLOG_ACTION_TYPES } from "../../Context/blogContext";

export type blogType = {
  title: string;
  date: Date;
  author: string;
  content: string;
  id: string;
  userId: string;
};

const Blog = ({ blog }: { blog: blogType }) => {
  const location = useLocation();
  const { title, date, author, content, id } = blog;
  const dateString = date.toDateString();
  const [edit, setEdit] = useState(false);
  const splitDate = dateString?.split(" ", 4);
  const editable: boolean = location.pathname === "/myblogs" ? true : false;
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const { dispatch } = useContext(BlogsContext);
  const handleEdit = () => {
    setEdit(true);
  };

  const handleDeleteSuccess = async () => {
    try {
      setLoading(true);
      await deletBlog(id);
      setLoading(false);
      setConfirmAlert(false);
      setAlert(true);
      setAlertMessage("Blog Deleted");
      setAlertType("success");
      const blogs = await getBlogs();
      dispatch({ type: BLOG_ACTION_TYPES.SET_BLOGS, payload: blogs });
    } catch (error) {
      setLoading(false);
      setAlert(true);
      setAlertMessage("Error Occurred");
      setAlertType("error");
    }
  };

  const handleDeleteClick = () => {
    setConfirmAlert(true);
  };

  return (
    <div className="my-5 md:my-4 md:pr-10 w-5/6">
      <CreateBlog isOpen={edit} setOpen={setEdit} blog={blog} />
      {alert && (
        <GenericAlert
          message={alertMessage}
          closeAlert={setAlert}
          type={alertType}
        />
      )}
      {confirmAlert && (
        <ConfirmAlert
          closeAlert={setConfirmAlert}
          onSucces={handleDeleteSuccess}
          loading={loading}
        />
      )}
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="font-lexend pb-6 font-black text-xl sm:text-2xl hidden sm:block uppercase">
          {`${splitDate[2]} ${splitDate[1]}`}
        </h1>
        {editable && (
          <div>
            <button
              onClick={handleEdit}
              className="text-dark text-xl md:text-3xl mt-2 md:mt-0 mr-2 md:m-4 hover:scale-105"
            >
              <AiOutlineEdit />
            </button>
            <button
              onClick={handleDeleteClick}
              className="text-dark text-xl md:text-3xl mt-2 md:mt-0 md:m-4 hover:scale-105"
            >
              <AiOutlineDelete />
            </button>
          </div>
        )}
      </div>
      <Link
        to={id ? "/" + id : ""}
        state={{
          path: location?.pathname,
          blog: { title, date, author, content, id },
        }}
      >
        <h1 className="font-dmSerif sm:pb-6 text-2xl sm:text-3xl text-primary">
          {title}
        </h1>
        <h1 className="font-lexend pt-4 text-lg pb-6 sm:text-xl break-words font-light blog-content">
          {content.length > 150 ? content.slice(0, 150) : content}
          {content.length > 150 && (
            <span className="text-primary">...read more </span>
          )}
        </h1>
      </Link>
      <div className="flex justify-between">
        <h1 className="font-lexend pb-6 font-black text:xl sm:text-4xl block sm:hidden">
          {`${splitDate[2]} ${splitDate[1]}  ${splitDate[3]}`}
        </h1>

        <h1 className="font-lexend text-lg sm:text-xl font-light text-secondary">
          @{author}
        </h1>
      </div>
    </div>
  );
};

export default Blog;
