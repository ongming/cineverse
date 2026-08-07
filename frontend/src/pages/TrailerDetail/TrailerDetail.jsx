import { useParams } from "react-router-dom";
import { useState } from "react";
import { movies } from "../../data/movies.js";
import { Play, Heart, Star, User, Send } from "lucide-react";

export default function TrailerDetail() {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === parseInt(id));

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

  if (!movie) {
    return (
      <div className="mx-auto p-10 min-h-screen text-center text-white font-mono text-2xl font-bold flex items-center justify-center">
        <h2>Không tìm thấy phim!</h2>
      </div>
    );
  }

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
    <div className="max-w-[1300px] mx-auto px-5 py-10 text-white">
      {/* 1. Main info wrapper */}
      <div className="flex flex-col md:flex-row gap-10 mb-12">
        {/* Left column: Poster & Buttons */}
        <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-4">
          <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              className="w-full aspect-[2/3] object-cover block"
              src={movie.image}
              alt={movie.name}
            />
          </div>

          <button
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-extrabold rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg hover:shadow-amber-400/30 hover:scale-105 transition-all"
            onClick={() => window.open(movie.trailerUrl, "_blank")}
          >
            <Play className="w-4 h-4 fill-current" /> XEM TRAILER
          </button>

          <button className="w-full py-3 bg-dark-bg border border-[#1b8989] border-2 text-cyan-neon font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg hover:shadow-cyan-neon/30 hover:scale-105 transition-all">
            <Heart className="w-4 h-4" /> Thêm vào danh sách
          </button>
        </div>

        {/* Right column: Details */}
        <div className="flex-1 flex flex-col gap-5 text-left">
          <h1 className="text-3xl font-mono md:text-4xl font-extrabold text-white m-0 leading-tight">
            {movie.name}
          </h1>

          <div className="flex items-center gap-3 text-sm text-[#8c8c8c]">
            <span>{movie.year}</span>
            <span className="text-zinc-600">•</span>
            <span>{movie.duration}</span>
            <span className="text-zinc-600">•</span>
            <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 text-white rounded text-xs font-bold">
              {movie.ageRating}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genre.map((g) => (
              <span
                key={g}
                className="px-3 py-2  bg-white/5 border border-[#1b8989] border-2  rounded-full text-xs text-cyan-neon font-medium"
              >
                {g}
              </span>
            ))}
          </div>

          <p className="text-[#a0a0a0] leading-relaxed text-sm md:text-base m-0">
            {movie.description}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <span className="block text-xs text-[#6c7284] uppercase font-bold mb-1">
                Đạo diễn
              </span>
              <span className="text-sm font-semibold text-white">
                {movie.director}
              </span>
            </div>
            <div>
              <span className="block text-xs text-[#6c7284] uppercase font-bold mb-1">
                Diễn viên
              </span>
              <span className="text-sm font-semibold text-white">
                {movie.cast.join(", ")}
              </span>
            </div>
            <div>
              <span className="block text-xs text-[#6c7284] uppercase font-bold mb-1">
                Quốc gia
              </span>
              <span className="text-sm font-semibold text-white">
                {movie.country}
              </span>
            </div>
            <div>
              <span className="block text-xs text-[#6c7284] uppercase font-bold mb-1">
                Điểm đánh giá
              </span>
              <span className="text-sm font-bold text-amber-400 flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {movie.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Cast List */}
      <div className="mb-12 text-left">
        <h2 className="text-xl font-bold mb-6 text-white border-l-4 border-amber-400 pl-3">
          Danh Sách Dàn Diễn Viên
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movie.cast.map((actor, index) => (
            <div key={actor} className="p-3 flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={`https://i.pravatar.cc/150?img=${(index + 10) * 3}`}
                  alt={actor}
                />
              </div>
              <span className="text-sm font-semibold text-center text-white line-clamp-1">
                {actor}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. User Reviews */}
      <div className="mb-12 text-left">
        <h2 className="text-xl font-bold mb-6 text-white border-l-4 border-amber-400 pl-3">
          Nhận Xét Của Người Xem
        </h2>

        <div className="bg-[#12141a] border border-white/10 rounded-xl p-4 flex gap-3 mb-8 items-start">
          <div className="w-10 h-10 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center shrink-0">
            <User className="w-5 h-5" />
          </div>
          <textarea
            className="flex-1 bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm outline-none resize-none focus:border-amber-400"
            rows="3"
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
          <button
            className="px-5 py-3 bg-amber-400 text-black font-bold rounded-lg cursor-pointer hover:bg-yellow-400 transition-colors shrink-0 flex items-center gap-1.5"
            onClick={handleSendReview}
          >
            <Send className="w-4 h-4" /> GỬI
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#12141a] border border-white/10 rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm">
                  <User className="w-4 h-4 text-zinc-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold m-0 text-white">
                    {rev.author}
                  </h3>
                  <span className="text-xs text-[#6c7284]">{rev.time}</span>
                </div>
                <div className="text-amber-400 text-sm font-bold flex items-center gap-0.5">
                  {Array(rev.rating)
                    .fill()
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                </div>
              </div>
              <p className="text-sm text-[#c0c0c0] m-0 leading-relaxed">
                {rev.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Recommended Trailers */}
      <div className="text-left">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold m-0 text-white border-l-4 border-amber-400 pl-3">
            Trailer Được Đề Xuất
          </h2>
          <span className="text-xs text-amber-400 cursor-pointer hover:underline">
            Xem tất cả
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies
            .filter(
              (m) =>
                m.id !== movie.id &&
                m.genre.some((g) => movie.genre.includes(g)),
            )
            .slice(0, 4)
            .map((recMovie) => (
              <div
                key={recMovie.id}
                className="group bg-[#12141a] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-amber-400 transition-all"
              >
                <div className="relative w-full pt-[140%] overflow-hidden">
                  <img
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={recMovie.image}
                    alt={recMovie.name}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="w-10 h-10 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-bold m-0 text-white line-clamp-1">
                    {recMovie.name}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
