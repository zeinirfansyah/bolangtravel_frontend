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
      <footer className={`${backgroundColor()} border-t-2 border-gray-200`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-8 text-center space-y-2">
            <h1 className="text-l font-semibold text-dark">Copyright © 2024</h1>
            <p className="text-dark font-semibold">BolangTravel</p>
          </div>
        </div>
      </footer>
    </>
  );
};
