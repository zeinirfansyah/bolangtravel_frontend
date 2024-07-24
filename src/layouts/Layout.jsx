import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link, useLocation } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
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
            <div className="w-1/5 bg-slate-800 text-white">
              <div className="p-6 flex flex-col gap-3 justify-center items-center min-h-[20vh]">
                <CircleUserRound size={64} />
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-xl font-semibold">{user?.fullname}</h1>
                  <p className="text-gray-400">{user?.email}</p>
                </div>
              </div>
              <ul >
                <li className="px-6 py-3">
                  <Link to="/admin">Dashboard</Link>
                </li>
                <li className="px-6 py-3">
                  <Link to="/admin/booking">Bookings</Link>
                </li>
                <li className="px-6 py-3">
                  <Link to="/admin/destination">Destinations</Link>
                </li>
                <li className="px-6 py-3">Travel Packages</li>
              </ul>
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
