import { useParams } from "react-router-dom";
import { useState } from "react";
import { movies } from "../../data/movies.js";
import "./TrailerDetail.css";

export default function TrailerDetail() {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === parseInt(id));

  // Khởi tạo state danh sách nhận xét với dữ liệu mẫu từ thiết kế Stitch
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Nguyễn Thảo",
      time: "Đã xem 2 ngày trước",
      rating: 5,
      content:
        "Kỳ xảo điện ảnh thực sự quá ấn tượng! Tôi chưa bao giờ thấy một bộ phim nào có bối cảnh chi tiết và mượt mà đến vậy. Diễn xuất của dàn diễn viên cũng rất xuất thần.",
    },
    {
      id: 2,
      author: "Quốc Anh",
      time: "Đã xem 1 tuần trước",
      rating: 5,
      content:
        "Cốt truyện lôi cuốn từ đầu đến cuối. Âm thanh trong rạp (hoặc hệ thống loa tốt) sẽ khiến bạn thực sự chìm đắm. Một bước tiến lớn cho thể loại này.",
    },
  ]);
  const [newReviewText, setNewReviewText] = useState("");

  // Trường hợp không tìm thấy phim
  if (!movie) {
    return (
      <div className="trailer-detail-container error-page">
        <h2>Không tìm thấy phim!</h2>
      </div>
    );
  }

  // Xử lý gửi nhận xét mới
  const handleSendReview = () => {
    if (newReviewText.trim() === "") return;
    const newReview = {
      id: Date.now(),
      author: "Khách viếng thăm",
      time: "Vừa xong",
      rating: 5,
      content: newReviewText.trim(),
    };
    setReviews([newReview, ...reviews]);
    setNewReviewText("");
  };

  return (
    <div className="trailer-detail-container">
      {/* 1. Phần thông tin chính chia đôi (Poster bên trái, Chữ bên phải) */}
      <div className="trailer-content-wrapper">
        {/* Cột trái: Poster & Nút hành động */}
        <div className="poster-column">
          <div className="poster-img-container">
            <img className="movie-poster" src={movie.image} alt={movie.name} />
          </div>

          <button
            className="trailer-btn"
            onClick={() => window.open(movie.trailerUrl, "_blank")}
          >
            <span className="play-icon">▶</span> XEM TRAILER
          </button>

          <button className="saved-btn">
            <span className="heart-icon">♡</span> Thêm vào danh sách
          </button>
        </div>

        {/* Cột phải: Chi tiết chữ */}
        <div className="detail-column">
          <h1 className="movie-title">{movie.name}</h1>

          <div className="movie-meta-bar">
            <span>{movie.year}</span>
            <span className="separator">•</span>
            <span>{movie.duration}</span>
            <span className="separator">•</span>
            <span className="age-limit-badge">{movie.ageRating}</span>
          </div>

          <div className="movie-genres">
            {movie.genre.map((g) => (
              <span key={g} className="genre-pill">
                {g}
              </span>
            ))}
          </div>

          <p className="movie-description">{movie.description}</p>

          <div className="credits-grid">
            <div className="credit-item">
              <span className="credit-label">Đạo diễn</span>
              <span className="credit-value">{movie.director}</span>
            </div>
            <div className="credit-item">
              <span className="credit-label">Diễn viên</span>
              <span className="credit-value">{movie.cast.join(", ")}</span>
            </div>
            <div className="credit-item">
              <span className="credit-label">Quốc gia</span>
              <span className="credit-value">{movie.country}</span>
            </div>
            <div className="credit-item">
              <span className="credit-label">Điểm đánh giá</span>
              <span className="credit-value rating-value">
                ★ {movie.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Danh Sách Dàn Diễn Viên */}
      <div className="cast-wrapper">
        <h2 className="section-title">Danh Sách Dàn Diễn Viên</h2>
        <div className="cast-list">
          {movie.cast.map((actor, index) => (
            <div key={actor} className="actor-card">
              <div className="actor-avatar">
                {/* Dùng ảnh placeholder ngẫu nhiên để trông thật hơn */}
                <img
                  src={`https://i.pravatar.cc/150?img=${(index + 10) * 3}`}
                  alt={actor}
                />
              </div>
              <div className="actor-info">
                <span className="actor-name">{actor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Nhận Xét Của Người Xem */}
      <div className="user-review-wrapper">
        <h2 className="section-title">Nhận Xét Của Người Xem</h2>

        {/* Ô viết nhận xét */}
        <div className="review-input-box">
          <div className="user-avatar-circle">👤</div>
          <textarea
            placeholder="Viết nhận xét của bạn..."
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendReview();
              }
            }}
          ></textarea>
          <button className="send-btn" onClick={handleSendReview}>
            <span className="send-icon">➤</span> GỬI
          </button>
        </div>

        {/* Danh sách nhận xét */}
        <div className="reviews-grid">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">👤</div>
                <div className="reviewer-info">
                  <h3>{rev.author}</h3>
                  <span>{rev.time}</span>
                </div>
                <div className="review-stars">
                  {Array(rev.rating)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="star-gold">
                        ★
                      </span>
                    ))}
                </div>
              </div>
              <p className="review-content">{rev.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Trailer Được Đề Xuất */}
      <div className="recommended-trailer-wrapper">
        <div className="recommended-header">
          <h2 className="section-title">Trailer Được Đề Xuất</h2>
          <span className="view-all-link">Xem tất cả</span>
        </div>

        <div className="recommended-grid">
          {movies
            .filter(
              (m) =>
                m.id !== movie.id &&
                m.genre.some((g) => movie.genre.includes(g)),
            )
            .slice(0, 4)
            .map((recMovie) => (
              <div key={recMovie.id} className="rec-movie-card">
                <div className="rec-poster-wrapper">
                  <img src={recMovie.image} alt={recMovie.name} />
                  <div className="rec-play-overlay">
                    <span className="rec-play-icon">▶</span>
                  </div>
                </div>
                <div className="rec-info">
                  <h3>{recMovie.name}</h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
