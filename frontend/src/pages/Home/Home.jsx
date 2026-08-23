// pages/Home/Home.jsx
import { useHomeData } from "../../hooks/data/useHomeData.js";
import { useTopRateMovies } from "../../hooks/data/useTopRateMovies.js";
import LoadingState from "../../components/Common/LoadingState.jsx";
import ErrorState from "../../components/Common/ErrorState.jsx";
import HeroBanner from "./HeroBanner.jsx";
import StatsBar from "./StatsBar.jsx";
import MovieRow from "./MovieRow.jsx";
import FeaturedBanner from "./FeaturedBanner.jsx";
import BentoGrid from "./BentoGrid.jsx";
import ActorCircleGrid from "./ActorCircleGrid.jsx";

export default function Home() {
  const { data, isLoading, isError, refetch } = useHomeData();
  const { data: topRated, isLoading: isTopRatedLoading, isError: isTopRatedError, refetch: refetchTop } = useTopRateMovies();

  if (isLoading || isTopRatedLoading) {
    return <LoadingState message="ĐANG TẢI GIAO DIỆN CINEVERSE HOMEPAGE..." />;
  }

  if (isError || isTopRatedError || !data) {
    return (
      <ErrorState
        title="Không thể tải dữ liệu Trang Chủ!"
        message="Vui lòng kiểm tra kết nối mạng và thử lại sau."
        onRetry={() => {
          refetch();
          refetchTop();
        }}
      />
    );
  }

  const {
    heroMovies,
    nowPlaying,
    upcoming,
    featuredMovie,
    overviewStats,
    topActors,
  } = data || {};

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
      <ActorCircleGrid actors={topActors} />
    </div>
  );
}
