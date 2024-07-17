import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";

export const Layout = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <section id="content" className="min-h-screen text-dark">
        {children}
      </section>
      <Footer />
    </>
  );
};
