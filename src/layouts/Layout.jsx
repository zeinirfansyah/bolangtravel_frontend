import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link, useLocation } from "react-router-dom";
import {
  Book,
  BookDashed,
  CircleUserRound,
  LucideLayoutDashboard,
  TreePalm,
  TreePine,
  User,
  User2Icon,
  UserSquare2Icon,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";

export const Layout = ({ children }) => {
  const location = useLocation();

  const { user } = useAuthStore((state) => state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {location.pathname.includes("/admin") ? (
        <>
          <div className="flex">
            <div className="w-1/5">
              <div className="px-6 pt-7 flex">
                <h1 className="text-gray-400">Admin Dashboard</h1>
              </div>
              <hr className="mx-auto border-gray-300 my-6" />
              <div className="px-6 flex gap-3 justify-center items-center">
                <UserSquare2Icon size={64} className="stroke-1 text-gray-500" />
                <div className="flex flex-col">
                  <h1 className="text-xl font-semibold">{user?.fullname}</h1>
                  <p className="text-gray-400">{user?.email}</p>
                </div>
              </div>
              <hr className="w-[90%] mx-auto border-gray-600 my-6" />
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
                      <Link to="/admin">About Us</Link>
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
                      <Link to="/admin/destination">Travel Packages</Link>
                    </li>
                    <li className="px-2 py-3 flex gap-2 items-center">
                      <TreePalm size={18} />
                      <Link to="/admin/destination">Destinations</Link>
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
                      <Link to="/admin/booking">User Data</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full">
              <Header />
              <section id="content" className="min-h-[90vh] text-dark">
                {children}
              </section>
              <Footer />
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
