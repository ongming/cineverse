import Footer from "../components/Footer/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.jsx";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}

export default AuthLayout;
