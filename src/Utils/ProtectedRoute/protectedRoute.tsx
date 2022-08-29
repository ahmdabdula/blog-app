import { Navigate, Outlet } from "react-router-dom";
import { UserType } from "../../Context/userContext";

const ProtectedRoutes = ({ currentUser }: { currentUser: UserType | null }) => {
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
