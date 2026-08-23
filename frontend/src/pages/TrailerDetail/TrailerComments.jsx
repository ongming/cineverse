import { Star, Send, Award, MessageSquare, Flag } from "lucide-react";
import { useMovieReviews } from "../../hooks/data/useMovieReviews.js";

export default function TrailerComments({ movieId }) {
  const {
    reviews,
    summary,
    isLoading,
    newReviewText,
    setNewReviewText,
    userRating,
    setUserRating,
    hoverRating,
    setHoverRating,
    handleSubmitReview,
    isSubmitting,
  } = useMovieReviews(movieId);

  const avgScore = summary?.averageScore ?? "9.0";
  const totalCount = summary?.totalReviews ?? reviews.length ?? 0;
  const distribution = summary?.distribution;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <h2 className="text-lg sm:text-xl font-bold text-white font-mono uppercase tracking-wide flex items-center gap-2">
        <Award className="w-5 h-5 text-amber-400" />
        ĐÁNH GIÁ & BÌNH LUẬN NGƯỜI XEM
      </h2>

      {/* Top Split: Left Review Stats, Right Add Comment Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 pb-8 border-b border-white/10 relative">
        {/* Left Column: Review Score Overview (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between text-center sm:text-left pr-0 lg:pr-6">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              TỔNG QUAN ĐÁNH GIÁ
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white font-mono my-2">
              {avgScore}
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 mb-1">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
            </div>
            <span className="text-[11px] font-mono text-gray-500">
              Dựa trên {totalCount} lượt đánh giá
            </span>
          </div>

          {/* Score Breakdown Progress Bars (5 Stars down to 1 Star) */}
          <div className="space-y-1.5 mt-6 font-mono text-[10px]">
            {[5, 4, 3, 2, 1].map((starNum) => {
              const tierData = distribution?.[starNum];
              const barPct = tierData?.percent ?? 0;

              return (
                <div key={starNum} className="flex items-center gap-2">
                  <span className="w-3 text-gray-400 text-right">
                    {starNum}
                  </span>
                  <div className="flex-1 bg-white/5 border border-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        barPct > 0 ? "bg-amber-400" : "bg-transparent"
                      }`}
                      style={{
                        width: `${barPct}%`,
                      }}
                    />
                  </div>
                  <span className="w-8 text-gray-500 text-left text-[9px]">
                    {barPct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vertical Divider Line between Ratings & Comments on Desktop */}
        <div className="hidden lg:block absolute left-[33.33%] top-0 bottom-8 w-[1px] bg-white/10 -translate-x-1/2" />

        {/* Right Column: Write Comment Form (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-6">
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Comment Textarea Input */}
            <textarea
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              placeholder={`Chia sẻ cảm nghĩ của bạn về bộ phim ...`}
              rows="3"
              required
              className="w-full bg-[#12141a] border border-white/10 focus:border-amber-400 rounded-md p-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-all resize-none font-mono"
            />

            {/* Form Actions Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* 10-Star Interactive Rating Picker */}
              <div className="flex items-center gap-1 font-mono text-xs">
                <span className="text-gray-400 text-[11px] mr-1">
                  Điểm đánh giá của bạn:
                </span>
                {Array(10)
                  .fill()
                  .map((_, i) => {
                    const starValue = i + 1;
                    const isLit = starValue <= (hoverRating || userRating);
                    return (
                      <button
                        key={starValue}
                        type="button"
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setUserRating(starValue)}
                        className="p-0.5 transition-transform hover:scale-125 cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            isLit
                              ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    );
                  })}
                <span className="text-amber-400 font-bold ml-1.5">
                  {hoverRating || userRating}/10
                </span>
              </div>

              {/* Submit Button */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "ĐANG GỬI..." : "GỬI BÌNH LUẬN"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Clean Comment Feed List */}
      {isLoading ? (
        <div className="text-center py-8 text-xs font-mono text-gray-500">
          Đang tải bình luận...
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 text-xs font-mono text-gray-500 border border-dashed border-white/10 rounded-md">
          Chưa có bình luận nào cho bộ phim này. Hãy là người đầu tiên đánh giá!
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => {
            const author = rev.username || rev.author || "Thành viên Cineverse";
            const avatar =
              rev.avatarUrl ||
              rev.avatar ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${rev.id || "Cineverse"}`;
            const ratingScore = rev.score || rev.rating || 10;
            const textContent = rev.comment || rev.content || "";
            const timeAgo = rev.createdAt
              ? new Date(rev.createdAt).toLocaleDateString("vi-VN")
              : rev.time || "Vừa xong";

            return (
              <div
                key={rev.id}
                className="bg-[#0a0b0e] border border-[#1e2230] hover:border-[#2b3145] rounded-md p-5 transition-all space-y-3"
              >
                {/* Comment Header */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatar}
                      alt={author}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = defaultAvatar;
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white font-mono uppercase">
                          {author}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500">
                        {timeAgo}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 bg-[#12141a] px-2.5 py-1 rounded-lg border border-white/5 text-xs font-mono text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{ratingScore}/10</span>
                  </div>
                </div>

                {/* Comment Body Content */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-mono">
                  {textContent}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {reviews.length > 0 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            className="px-6 py-3 bg-[#0a0b0e] border border-[#23283a] hover:border-amber-400 text-xs font-mono text-gray-300 hover:text-white font-bold rounded-xl transition-all cursor-pointer shadow-md uppercase"
          >
            XEM THÊM BÌNH LUẬN
          </button>
        </div>
      )}
    </div>
  );
}
