import { Navigate, Outlet } from "react-router-dom";
import {} from "../../Context/userContext";
import { UserType } from "../../Context/userContext";

const ProtectedRoutes = ({ currentUser }: { currentUser: UserType | null }) => {
  const user = window.localStorage.getItem("currentUser");
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
