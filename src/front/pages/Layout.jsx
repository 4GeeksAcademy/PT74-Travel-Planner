import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop>
        <Navbar />
        <main
          className="flex-grow-1 w-100"
          style={{ paddingTop: isHomePage ? 0 : "120px" }}
        >
          <Outlet />
        </main>
        <Footer />
      </ScrollToTop>
    </div>
  );
};