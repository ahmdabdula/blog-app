import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  UserContext,
  UserType,
  USER_ACTION_TYPES,
} from "../../Context/userContext";

const ProtectedRoutes = ({ currentUser }: { currentUser: UserType | null }) => {
  const { dispatch } = useContext(UserContext);
  const user = window.localStorage.getItem("currentUser");
  const userParsed = user ? JSON.parse(user) : null;
  dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: userParsed });

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
