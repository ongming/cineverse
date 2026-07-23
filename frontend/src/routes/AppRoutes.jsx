import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import TrailerDetail from "../pages/TrailerDetail/TrailerDetail.jsx";
import Search from "../pages/SearchPage/Search.jsx";
import MainLayout from "../layouts/MainLayout/MainLayout.jsx";
import Category from "../pages/Category/Category.jsx";
import Ranking from "../pages/Ranking/Ranking.jsx";
import Login from "../pages/Login/Login.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/trailer/:id" element={<TrailerDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
