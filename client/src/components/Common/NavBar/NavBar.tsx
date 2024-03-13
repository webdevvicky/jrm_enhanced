// components/Common/NavBar/NavBar.tsx
import { Link, useNavigate } from "react-router-dom";
import jrmlogo from "../../../assets/jrm_logo.jpeg";
import { useEffect } from "react";

interface NavItem {
  to: string;
  label?: string;
  subcategories?: NavItem[];
}

interface NavBarProps {
  navItems: NavItem[];
}

const NavBar = ({ navItems }: NavBarProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const closeNavbar = () => {
      const navbarToggler = document.querySelector(
        ".navbar-toggler"
      ) as HTMLElement;
      if (navbarToggler && navbarToggler.classList.contains("show")) {
        navbarToggler.click(); // Simulate a click to close the navbar
      }
    };

    // Close the navbar when a link is clicked
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", closeNavbar);
    });

    return () => {
      // Remove event listeners on component unmount
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.removeEventListener("click", closeNavbar);
      });
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light text-black  border-bottom  shadow-sm  ">
      <div className="container-lg">
        <div
          style={{ maxWidth: "80px", maxHeight: "100px" }}
          className=" text-start "
        >
          <img
            src={jrmlogo}
            alt="jrm"
            className=" img-fluid  img-thumbnail "
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item">
              <Link to="/" className="nav-link fw-bold">
                Home
              </Link>
            </li>
            {navItems.map((item, index) => (
              <li className="nav-item" key={index}>
                {item.subcategories ? (
                  <div className="nav-item dropdown">
                    <Link
                      to={item.to}
                      className="nav-link dropdown-toggle fw-bold"
                      id={`navbarDropdown${index}`}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {item.label || item.to}
                    </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby={`navbarDropdown${index}`}
                    >
                      {item.subcategories.map((subcategory, subIndex) => (
                        <Link
                          to={subcategory.to}
                          className="dropdown-item"
                          key={subIndex}
                        >
                          {subcategory.label || subcategory.to}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link to={item.to} className="nav-link fw-bold">
                    {item.label || item.to}
                  </Link>
                )}
              </li>
            ))}

            <li className="nav-item">
              <Link
                to="login"
                className="nav-link fw-bold"
                onClick={() => {
                  localStorage.clear();
                  navigate("login");
                }}
              >
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
