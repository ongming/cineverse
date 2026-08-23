import { useState, useMemo } from "react";
import LoadingState from "../../components/Common/LoadingState.jsx";
import ErrorState from "../../components/Common/ErrorState.jsx";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { useTrailerDetail } from "../../hooks/data/useTrailerDetail.js";

export default function MovieCastPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { movieData: movie, isLoading, isError } = useTrailerDetail();

  const castMembers = movie?.cast_members || [];

  // Filter cast list by search query
  const filteredCast = useMemo(() => {
    if (!searchTerm.trim()) return castMembers;
    return castMembers.filter(
      (act) =>
        act.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.character_name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [castMembers, searchTerm]);

  if (isLoading) {
    return <LoadingState message="ĐANG TẢI DÀN DIỄN VIÊN BỘ PHIM..." />;
  }

  if (isError || !movie) {
    return (
      <ErrorState
        title="Không thể tải dữ liệu diễn viên!"
        message="Không thể tìm thấy danh sách diễn viên cho bộ phim này."
        backLink={`/trailer/${id}`}
        backText="QUAY LẠI PHIM"
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#080808] text-white py-8 px-4 sm:px-8 xl:px-16 font-mono text-left">
      {/* Navigation Top Bar */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <Link
          to={`/trailer/${id}`}
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-cyan-400 transition-colors no-underline uppercase font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> QUAY LẠI CHI TIẾT PHIM
        </Link>
        <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
          DÀN DIỄN VIÊN TOÀN BỘ
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto p-6 sm:p-10 shadow-2xl space-y-8">
        {/* Header Bar: Title, Subtitle, Count & Search Input */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1f2332]">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-20 bg-amber-400 rounded-sm" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white font-mono uppercase tracking-wide m-0">
                DIỄN VIÊN & ĐẠO DIỄN
              </h1>
              <p className="text-xs font-mono text-gray-400 mt-1 m-0">
                Bộ phim:{" "}
                <span className="text-amber-400 font-bold">
                  {movie.title || movie.name}
                </span>
              </p>
              <span className="inline-block mt-2 text-xs font-mono text-gray-400 font-bold uppercase">
                {filteredCast.length} DIỄN VIÊN
              </span>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm diễn viên..."
              className="w-full bg-[#181a24] border border-[#252a3b] focus:border-amber-400 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Director Highlight Section */}
        {movie.director_name && (
          <div className="p-4 flex items-center gap-4 max-w-sm">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 p-0.5 shrink-0">
              <img
                src={movie.director_path}
                alt={movie.director_name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono uppercase">
                {movie.director_name}
              </h4>
              <span className="text-[10px] font-mono text-amber-400 font-extrabold uppercase tracking-wider">
                ĐẠO DIỄN
              </span>
            </div>
          </div>
        )}

        {/* Cast Grid (3 columns on mobile, 4 on tablet, 6 on desktop) */}
        {filteredCast.length === 0 ? (
          <div className="w-full py-16 text-center text-gray-500 font-mono text-sm">
            Không tìm thấy diễn viên nào phù hợp với từ khóa "{searchTerm}".
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 sm:gap-8">
            {filteredCast.map((act) => (
              <div
                key={act.id || act.name}
                onClick={() => navigate(`/actors/${act.id}`)}
                className="flex flex-col items-center text-center group cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-amber-400 transition-all mb-3 shadow-lg">
                  <img
                    src={act.profile_path}
                    alt={act.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h4 className="text-xs font-bold text-white font-mono line-clamp-1 group-hover:text-amber-400 transition-colors uppercase">
                  {act.name}
                </h4>
                <span className="text-[10px] font-mono text-cyan-400 uppercase mt-0.5 line-clamp-1">
                  {act.character_name ||
                    act.known_for_department ||
                    "DIỄN VIÊN"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
