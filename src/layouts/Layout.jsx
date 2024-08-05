import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link, useLocation } from "react-router-dom";
import {
  Book,
  BookDashed,
  BookDownIcon,
  LucideLayoutDashboard,
  TreePalm,
  TreePine,
  User,
} from "lucide-react";

export const Layout = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {location.pathname.includes("/admin") ? (
        <>
          <div className="flex">
            <div className="w-1/5 bg-slate-800 text-white">
              <div className="flex flex-col gap-1 px-6 pt-7">
                <p className="text-xs text-gray-400">Desktop Mode</p>
                <h1 className="text-gray-400">Admin Dashboard</h1>
              </div>
              <hr className="mx-auto border-gray-300 my-6" />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col px-6">
                  <h3 className="text-sm">Master</h3>
                  <ul>
                    <li className="py-3 px-2 flex gap-2 items-center">
                      <LucideLayoutDashboard size={18} />
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="py-3 px-2 flex gap-2 items-center">
                      <BookDashed size={18} />
                      <Link to="/admin/guide">Guide Book</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col px-6">
                  <h3 className="text-sm">Master</h3>
                  <ul>
                    <li className="px-2 py-3 flex gap-2 items-center">
                      <TreePalm size={18} />
                      <Link to="/admin/destination">Destinations</Link>
                    </li>
                    <li className="px-2 py-3 flex gap-2 items-center">
                      <TreePine size={18} />
                      <Link to="/admin/travel-package">Travel Packages</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col px-6">
                  <h3 className="text-sm">Transactions</h3>
                  <ul>
                    <li className="px-2 py-3 flex gap-2 items-center">
                      <Book size={18} />
                      <Link to="/admin/booking">Bookings</Link>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col px-6">
                  <h3 className="text-sm">Users</h3>
                  <ul>
                    <li className="px-2 py-3 flex gap-2 items-center">
                      <User size={18} />
                      <Link to="/admin/user-data">User Data</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full">
              <Header className="" />
              <section
                id="content"
                className="min-h-[90vh] text-dark overflow-y-auto"
              >
                {children}
              </section>
              <footer className="flex items-center p-4 bg-white border-t-2 border-pureGray">
                <p className="text-gray-400">Copyright 2024 BolangTravel</p>
              </footer>
            </div>
          </div>
        </>
      ) : (
        <>
          <Header />
          <section id="content" className="min-h-screen text-dark">
            {children}
          </section>
          <Footer />
        </>
      )}
    </>
  );
};
