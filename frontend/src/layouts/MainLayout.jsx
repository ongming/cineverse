import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.jsx";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
