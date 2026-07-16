import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import TrailerDetail from "../pages/TrailerDetail/TrailerDetail.jsx";
import SearchPage from "../pages/SearchPage/SearchPage.jsx";
import MainLayout from "../layouts/MainLayout/MainLayout.jsx";
import Category from "../pages/Category/Category.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/trailer/:id" element={<TrailerDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:name" element={<Category />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
