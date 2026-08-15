// pages/Home/Home.jsx
import { useHomeData } from "../../hooks/data/useHomeData.js";
import HeroBanner from "./HeroBanner.jsx";
import StatsBar from "./StatsBar.jsx";
import MovieRow from "./MovieRow.jsx";
import FeaturedBanner from "./FeaturedBanner.jsx";
import BentoGrid from "./BentoGrid.jsx";
import ActorCircleGrid from "./ActorCircleGrid.jsx";

export default function Home() {
  const { data, isLoading, isError } = useHomeData();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4 font-mono">
        <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-xs text-gray-400 uppercase tracking-widest animate-pulse">
          ĐANG TẢI GIAO DIỆN CINEVERSE HOMEPAGE...
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4 font-mono">
        <h2 className="text-lg font-bold text-amber-400">
          Không thể tải dữ liệu Trang Chủ!
        </h2>
        <p className="text-xs text-gray-400">Vui lòng kiểm tra kết nối và thử lại sau.</p>
      </div>
    );
  }

  const {
    heroMovies,
    nowPlaying,
    topRated,
    upcoming,
    featuredMovie,
    popularActors,
    overviewStats,
  } = data;

  return (
    <div className="w-full min-h-screen bg-dar-bg text-white font-mono overflow-x-hidden pb-16">
      {/* 1. Hero Showcase Banner (6 Movies, Auto Crossfade) */}
      <HeroBanner movies={heroMovies} />

      {/* 2. Platform Statistics Bar (Count-up Animation) */}
      <StatsBar stats={overviewStats} />

      {/* 3. Now Playing Movie Carousel (Swiper) */}
      <MovieRow
        title="PHIM ĐANG CHIẾU"
        movies={nowPlaying}
        viewAllLink="/movie-list/now-playing"
      />

      {/* 4. Featured Single Movie Banner of the Week */}
      <FeaturedBanner movie={featuredMovie} />

      {/* 5. Top Rated Bento Grid (1 Large + 4 Small) */}
      <BentoGrid movies={topRated} />

      {/* 6. Upcoming Movies Carousel (Swiper) */}
      <MovieRow
        title="PHIM SẮP CHIẾU"
        movies={upcoming}
        viewAllLink="/movie-list/upcoming"
      />

      {/* 7. Popular People & Directors Circle Grid */}
      <ActorCircleGrid actors={popularActors} />
    </div>
  );
}
