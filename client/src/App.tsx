import NavBar from "./components/Common/NavBar/NavBar";
import navItems from "./components/Common/NavBar/NavItems";
import ProtectedRoutes from "./routes/ProtectedRoutes";

import {
  getAllowedRoutes,
  isAdmin,
  isLoggedIn,
  useTokenNavigationEffect,
} from "./utils/auth";

const App = () => {
  useTokenNavigationEffect();

  const allowedRoutes = getAllowedRoutes();
  // Filter nav items based on allowed routes
  const filteredNavItems: NavItem[] = navItems.filter((navItem) =>
    allowedRoutes.includes(navItem.to.toLowerCase())
  );

  return (
    <div>
      {isLoggedIn() && (
        <NavBar navItems={isAdmin() ? navItems : filteredNavItems} />
      )}

      <div className=" bg-brown py-2" style={{ minHeight: "85vh" }}>
        <ProtectedRoutes />
      </div>
    </div>
  );
};

export default App;
