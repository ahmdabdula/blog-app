import { Navigate, Outlet } from "react-router-dom";
import {} from "../../Context/userContext";

const ProtectedRoutes = () => {
  const user = window.localStorage.getItem("currentUser");
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
