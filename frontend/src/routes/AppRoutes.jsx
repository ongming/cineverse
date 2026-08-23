import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import TrailerDetail from "../pages/TrailerDetail/TrailerDetail.jsx";
import ActorDetail from "../pages/ActorDetail/ActorDetail.jsx";
import MovieListCategoryPage from "../pages/Home/MovieList.jsx";
import Search from "../pages/SearchPage/Search.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Category from "../pages/Category/Category.jsx";
import Ranking from "../pages/Ranking/Ranking.jsx";
import Revenue from "../pages/Revenue/Revenue.jsx";
import Schedule from "../pages/Schedule/Schedule.jsx";
import Login from "../pages/Login/Login.jsx";
import WatchList from "../pages/WatchList/WatchList.jsx";
import MovieCastPage from "../pages/MovieCast/MovieCastPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/trailer/:id" element={<TrailerDetail />} />
        <Route path="/trailer/:id/cast" element={<MovieCastPage />} />
        <Route path="/actors/:id" element={<ActorDetail />} />
        <Route path="/person/:id" element={<ActorDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/movie-list/:type" element={<MovieListCategoryPage />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/schedule" element={<Schedule />} />

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <WatchList />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
