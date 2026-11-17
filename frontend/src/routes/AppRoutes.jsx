import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const Home = lazy(() => import("../pages/Home/Home.jsx"));
const TrailerDetail = lazy(() => import("../pages/TrailerDetail/TrailerDetail.jsx"));
const ActorDetail = lazy(() => import("../pages/ActorDetail/ActorDetail.jsx"));
const MovieListCategoryPage = lazy(() => import("../pages/Home/MovieList.jsx"));
const Search = lazy(() => import("../pages/SearchPage/Search.jsx"));
const Category = lazy(() => import("../pages/Category/Category.jsx"));
const Ranking = lazy(() => import("../pages/Ranking/Ranking.jsx"));
const Revenue = lazy(() => import("../pages/Revenue/Revenue.jsx"));
const Schedule = lazy(() => import("../pages/Schedule/Schedule.jsx"));
const Login = lazy(() => import("../pages/Login/Login.jsx"));
const WatchList = lazy(() => import("../pages/WatchList/WatchList.jsx"));
const MovieCastPage = lazy(() => import("../pages/MovieCast/MovieCastPage.jsx"));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/trailer/:id/cast" element={<MovieCastPage />} />
          <Route path="/actors/:id" element={<ActorDetail />} />
          <Route path="/person/:id" element={<Navigate to="/actors/:id" replace />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/movie-list/:type" element={<MovieListCategoryPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/trailer/:id" element={<TrailerDetail />} />
            <Route path="/watchlist" element={<WatchList />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;
