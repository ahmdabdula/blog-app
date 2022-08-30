import { FaSistrix } from "react-icons/fa";
import { AiOutlinePlusCircle, AiOutlineLogout } from "react-icons/ai";
import { useContext } from "react";
import { UserContext, USER_ACTION_TYPES } from "../../Context/userContext";
import { signOutUser } from "../../Utils/Firebase/firebase";

const TaskBar = () => {
  const { currentUser, dispatch } = useContext(UserContext);
  const name = currentUser ? currentUser.name : "";
  const nameInitial = name ? name[0] : "";

  const signOut = async () => {
    try {
      await signOutUser();
      dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: null });
      window.localStorage.setItem("currentUser", "");
    } catch {}
  };
  return (
    <>
      <div className="z-1 bg-white fixed w-full h-24 blur-xl bottom-0 lg:hidden" />
      <div className="z-100 fixed lg:static bg-dark lg:w-24 w-full lg:h-full h-16 lg:h-full bottom-0">
        <div className="lg:flex-col flex flex-row lg:items-start items-center lg:justify-start sm:justify-evenly justify-around w-full px-4 lg:py-6 text-white h-full text-center font-lexend ">
          <div className="my-5 flex lg:flex-col items-center justify-center w-2/6 lg:w-full">
            <div className="rounded-full bg-primary my-5 flex items-center justify-center lg:w-full lg:w-16 lg:h-16 h-10 w-10 ">
              <h1 className="sm:text-2xl text-xl">{nameInitial}</h1>
            </div>
            <h1 className="text-lg px-2 hidden sm:block lg:hidden">{name}</h1>
          </div>
          <div className="my-5 flex lg:flex-col items-center justify-center  w-2/6 lg:w-full">
            <button>
              <FaSistrix className="text-4xl text-primary font-bold" />
            </button>
            <h1 className="text-lg px-2 hidden sm:block">search</h1>
          </div>
          <div className="my-5 flex lg:flex-col items-center justify-center  w-2/6 lg:w-full">
            <button>
              <AiOutlinePlusCircle className="text-4xl text-primary font-bold" />
            </button>
            <h1 className="text-lg px-2 hidden sm:block ">create</h1>
          </div>
          <div className="flex lg:flex-col items-center h-full justify-end m-auto w-2/6 lg:w-full hidden lg:flex">
            <button onClick={signOut}>
              <AiOutlineLogout className="text-4xl text-primary font-bold" />
            </button>
            <h1 className="text-lg px-2 hidden sm:block ">logout</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskBar;
