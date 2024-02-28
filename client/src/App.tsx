import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import MyJwtPayload from "./interfaces/MyJwtPayload";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = token ? (jwtDecode(token) as MyJwtPayload) : null;
    const isTokenExpired = decoded?.exp && decoded.exp * 1000 < Date.now();
    // console.log(jwtDecode(token as any));
    if (!token || isTokenExpired) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <ProtectedRoutes />
    </div>
  );
};

export default App;
