import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const userToken = localStorage.getItem("auth_token");
  return userToken ? <Outlet /> : <Navigate to="/signin" replace={true} />;
}

export default ProtectedRoute;
