import { useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
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
    <>
      <footer id="footer" className=" bg-white border-t-2 border-pureGray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col justify-center items-center gap-2 text-center py-7">
            <div id="footer-title">
              <h1 className="text-xl font-semibold">
                <span className="text-secondary">Bolang</span>Travel.
              </h1>
            </div>
            <ul id="footer-contact" className="flex flex-col gap-2">
              <li className="text-gray-400">
                <a
                  href="mailto:mail@12.zeinirfansyah@gmail.com?subject=BolangTravel Portfolio"
                  target="_blank"
                  className="hover:text-secondary transition-all duration-500"
                >
                  support@bolangtravel.id
                </a>
              </li>
              <li className="text-gray-400">
                <a
                  href="mailto:mail@12.zeinirfansyah@gmail.com?subject=BolangTravel Portfolio"
                  target="_blank"
                  className="hover:text-secondary transition-all duration-500"
                >
                  620 ### 5678
                </a>
              </li>
              <li className="text-gray-400">
                © 2024 All rights reserved - BolangTravel
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};
