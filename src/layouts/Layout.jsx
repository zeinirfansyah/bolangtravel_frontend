import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <section id="content" className="min-h-screen mt-32">
        {children}
      </section>
      <Footer />
    </>
  );
};
