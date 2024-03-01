import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import MyJwtPayload from "./interfaces/MyJwtPayload";
import Login from "./components/Pages/Login";
import MarkettingRoutes from "./routes/MarkettingRoutes";
import NavBar from "./components/Common/NavBar/NavBar";

const App = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const decoded = token ? (jwtDecode(token) as MyJwtPayload) : null;
  //   const isTokenExpired = decoded?.exp && decoded.exp * 1000 < Date.now();
  //   // console.log(jwtDecode(token as any));
  //   if (!token || isTokenExpired) {
  //     navigate("/login");
  //   }
  // }, []);

  const navitem: NavItem[] = [
    {
      to: "Marketting",
      subcategories: [
        { to: "/Marketting/new", label: "New" },
        { to: "/Marketting/list", label: "List" },
        { to: "/Marketting/quote", label: "Quote" },
        { to: "/Marketting/Approvel", label: "Quote Approvel" },
      ],
    },
  ];

  return (
    <div>
      <NavBar navItems={navitem} />
      <MarkettingRoutes />
    </div>
  );
};

export default App;
