import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <section id="content" className="min-h-screen">
        {children}
      </section>
      <Footer />
    </>
  );
};
