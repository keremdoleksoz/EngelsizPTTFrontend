import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const allowedPaths = ["/form", "/thanks"];

  if (token && allowedPaths.includes(location.pathname)) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoute;
