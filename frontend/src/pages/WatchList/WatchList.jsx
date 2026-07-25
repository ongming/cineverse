import { useAuth } from "../../context/AuthContext.jsx";
import { movies } from "../../data/movies.js";
import { Link } from "react-router-dom";
import "./WatchList.css";

export default function WatchList() {
  const { user } = useAuth();

  // Giả lập danh sách phim yêu thích của user
  const savedMovies = movies.slice(0, 3);

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <h1 className="watchlist-title">
          🎬 Danh Sách Xem Của <span className="highlight-user">{user?.username || "Bạn"}</span>
        </h1>
        <p className="watchlist-subtitle">
          Các bộ phim và trailer bạn đã lưu để xem lại sau.
        </p>
      </div>

      {savedMovies.length > 0 ? (
        <div className="watchlist-grid">
          {savedMovies.map((movie) => (
            <div key={movie.id} className="watchlist-card">
              <div className="watchlist-poster-wrapper">
                <img src={movie.image} alt={movie.name} />
                <Link to={`/trailer/${movie.id}`} className="play-overlay-btn">
                  ▶ Xem Ngay
                </Link>
              </div>
              <div className="watchlist-card-info">
                <h3>{movie.name}</h3>
                <div className="watchlist-meta">
                  <span>{movie.year}</span> • <span>★ {movie.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-watchlist">
          <p>Danh sách của bạn đang trống!</p>
          <Link to="/" className="browse-now-btn">Khám phá phim ngay</Link>
        </div>
      )}
    </div>
  );
}
