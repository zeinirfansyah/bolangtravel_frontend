import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const backgroundColor = () => {
    switch (location.pathname) {
      case "/login":
        return "bg-slate-100";
      case "/register":
        return "bg-slate-100";
      default:
        return "bg-white";
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-10 shadow  ${backgroundColor()}`}
    >
      <div className="max-w-7xl mx-auto">
        <nav className="Navbar lg:flex justify-between gap-20 items-center py-6 mx-4">
          <div className="flex flex-col lg:flex-row lg:gap-12">
            <div className="flex items-center justify-between">
              <Link id="brand" to="/">
                <h1 className="text-xl font-semibold  transition-all duration-500">
                  <span className="text-secondary">Bolang</span>Travel.
                </h1>
              </Link>
              <div className="flex items-end justify-end gap-2">
                <button
                  className="sm:hidden hover:bg-white px-3 py-1 transition-all  duration-500 rounded-lg cursor-pointer shadow order-2"
                  onClick={toggleMenu}
                  type="button"
                >
                  <span className="text-xl">&#9776;</span>
                </button>
              </div>
            </div>
            <ul
              id="menu"
              className={`lg:flex gap-5 ${
                isMenuOpen ? "" : "hidden"
              } text-navy items-center`}
            >
              <li className="my-4 lg:my-0">
                <Link
                  to="/"
                  className="hover:text-secondary transition-all duration-500"
                >
                  Home
                </Link>
              </li>
              <li className="my-4 lg:my-0">
                <Link
                  to="/paket-wisata"
                  className="active hover:text-secondary transition-all duration-500"
                >
                  Travel Package
                </Link>
              </li>
              <li className="my-4 lg:my-0">
                <Link
                  to="/tentang-kami"
                  className="hover:text-secondary transition-all duration-500"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div
            id="menu"
            className={`lg:flex gap-5 ${isMenuOpen ? "" : "hidden"} text-navy `}
          >
            <ul className="flex lg:items-center flex-col lg:flex-row lg:gap-5">
              <li className="my-2 lg:my-0">
                <Link
                  to="/login"
                  className="flex gap-2 hover:text-secondary transition-all duration-500"
                >
                  Login
                </Link>
              </li>
              <li className="my-2 lg:my-0">
                <Link
                  to="/register"
                  className="hover:text-secondary transition-all duration-500"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};
