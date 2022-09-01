import { FaSistrix } from "react-icons/fa";
import {
  AiOutlinePlusCircle,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { useContext, useState } from "react";
import { UserContext, USER_ACTION_TYPES } from "../../Context/userContext";
import { signOutUser } from "../../Utils/Firebase/firebase";
import CreateBlog from "../CreateBlog/createBlog";
import SearchBar from "../SearchBar/searchBar";
import { Link, useNavigate } from "react-router-dom";

const TaskBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { currentUser, dispatch } = useContext(UserContext);
  const [createBlog, setCreateBlog] = useState(false);
  const [search, setSearch] = useState(false);
  const name = currentUser ? currentUser.name : "";
  const nameInitial = name ? name[0] : "";
  const navigate = useNavigate();
  const handleCreate = () => {
    setCreateBlog(true);
  };

  const handleSearch = () => {
    setSearch(!search);
  };

  const signOut = async () => {
    try {
      await signOutUser();
      dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: null });
      window.localStorage.setItem("currentUser", "");
      navigate("/login");
    } catch {}
  };
  return (
    <>
      <CreateBlog blog={null} isOpen={createBlog} setOpen={setCreateBlog} />
      <SearchBar
        search={search}
        setSearch={setSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="z-1 bg-white fixed w-full h-24 blur-xl bottom-0 lg:hidden" />
      <div className="z-100 fixed lg:static bg-dark lg:w-24 w-full lg:h-full h-16 lg:h-full bottom-0">
        <div className="lg:flex-col flex flex-row lg:items-start items-center lg:justify-start sm:justify-evenly justify-around w-full px-4 lg:py-6 text-white h-full text-center font-lexend ">
          <div className="my-5 flex lg:flex-col items-center justify-center w-2/6 lg:w-full">
            <div className="rounded-full bg-primary my-5 flex items-center justify-center lg:w-full lg:w-16 lg:h-16 h-10 w-10 sm:text-black lg:text-white">
              <h1 className="sm:text-xl text-base">{nameInitial}</h1>
            </div>
            <h1 className="text-base px-2 hidden sm:block lg:hidden">{name}</h1>
          </div>
          <div className="my-5 flex lg:flex-col items-center justify-center  w-2/6 lg:w-full">
            <button className="hover:scale-105">
              <FaSistrix
                onClick={handleSearch}
                className="text-4xl text-primary font-bold"
              />
            </button>
            <h1 className="text-base px-2 hidden sm:block">search</h1>
          </div>
          <div className="my-5 flex lg:flex-col items-center justify-center  w-2/6 lg:w-full">
            <button onClick={handleCreate} className="hover:scale-105">
              <AiOutlinePlusCircle className="text-4xl text-primary font-bold" />
            </button>
            <h1 className="text-base px-2 hidden sm:block ">create</h1>
          </div>
          <div className="my-5 flex lg:flex-col items-center justify-center  w-2/6 lg:w-full">
            <Link to="/myblogs">
              <button className="hover:scale-105">
                <AiOutlineUser className="text-4xl text-primary font-bold" />
              </button>
            </Link>
            <h1 className="text-base px-2 hidden sm:block ">myBlogs</h1>
          </div>
          <div className="my-5 flex lg:flex-col items-center justify-center  w-2/6 lg:w-full">
            <button onClick={signOut}>
              <AiOutlineLogout className="text-4xl text-primary font-bold hover:scale-105" />
            </button>
            <h1 className="text-base px-2 hidden sm:block ">logout</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskBar;
