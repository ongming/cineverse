import { useState } from "react";
import { Link } from "react-router-dom";
import { movies } from "../../data/movies.js";
import "./Ranking.css";

export default function Ranking() {
  const [activeGenre, setActiveGenre] = useState(""); // Lưu trữ thể loại đang được chọn");

  // Danh sách thể loại ở cột bên phải
  const uniqueGenres = [...new Set(movies.map((movie) => movie.genre).flat())];

  const filteredMovies =
    activeGenre === ""
      ? movies
      : movies.filter((movie) => movie.genre.includes(activeGenre));

  // Sắp xếp danh sách phim theo điểm đánh giá từ cao xuống thấp để tự động phân hạng
  const rankedMovies = [...filteredMovies].sort((a, b) => b.rating - a.rating);

  return (
    <div className="ranking-page-container">
      <div className="ranking-content-wrapper">
        <div className="rankings-list-section">
          <h1 className="ranking-title">Bảng xếp hạng chung</h1>
          <p className="ranking-subtitle">
            Danh sách các phim được đánh giá cao nhất
            <span className="updated-time">Updated: 24m ago</span>
          </p>

          <div className="ranking-list">
            {rankedMovies.map((movie, index) => {
              const rank = index + 1;
              return (
                <div key={movie.id} className="ranking-item-card-wrapper">
                  <Link
                    to={`/trailer/${movie.id}`}
                    className="ranking-item-card"
                  >
                    {/* Hạng phim (Rank) */}
                    <div className={`rank-badge rank-${rank}`}>#{rank}</div>

                    {/* Poster phim */}
                    <div className="rank-poster-container">
                      <img
                        src={movie.image}
                        alt={movie.name}
                        className="rank-poster"
                      />
                    </div>

                    {/* Thông tin phim */}
                    <div className="rank-movie-info">
                      <h3 className="rank-movie-title">{movie.name}</h3>
                      <div className="rank-movie-meta">
                        <span>{movie.year}</span>
                        <span className="dot">•</span>
                        <span>{movie.duration}</span>
                        <span className="dot">•</span>
                        <span className="age-rating-box">
                          {movie.ageRating}
                        </span>
                      </div>
                      <div className="rank-movie-rating">
                        <span className="star-icon">★</span> {movie.rating}{" "}
                        <span className="max-rating">/ 10</span>
                      </div>
                    </div>

                    {/* Nút đánh dấu đã xem */}
                    <div
                      className="rank-action-watched"
                      onClick={(e) => {
                        e.preventDefault(); // Tránh kích hoạt Link chuyển trang
                        alert(`Đã đánh dấu đã xem phim: ${movie.name}`);
                      }}
                    >
                      <span className="bookmark-icon">🔖</span> Lưu vào danh
                      sách xem sau
                    </div>

                    {/* Icon thông tin bên phải */}
                    <div className="rank-info-btn">
                      <span className="info-icon-char">ⓘ</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <button className="load-more-rank-btn">Tải thêm xếp hạng</button>
        </div>

        {/* CỘT PHẢI: SIDEBAR LỌC THỂ LOẠI & XU HƯỚNG */}
        <div className="ranking-sidebar-section">
          {/* Widget 1: Lọc thể loại */}
          <div className="sidebar-widget genre-widget">
            <div className="widget-header">
              <span className="widget-icon">㗊</span>
              <h3>Bảng xếp hạng dựa theo thể loại</h3>
            </div>

            <div className="genre-pills-container">
              <button
                className={`genre-pill-btn ${activeGenre === "" ? "active" : ""}`}
                onClick={() => setActiveGenre("")}
              >
                Tất Cả
              </button>
              {uniqueGenres.map((g) => (
                <button
                  key={g}
                  className={`genre-pill-btn ${activeGenre === g ? "active" : ""}`}
                  onClick={() => setActiveGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
