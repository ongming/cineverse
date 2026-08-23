// components/CastModal/CastModal.jsx
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Search } from "lucide-react";

export default function CastModal({
  isOpen,
  onClose,
  movieCastNames = [],
  movieTitle = "",
}) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // 🟢 Bulletproof iOS & Mobile Body Scroll Lock (Fixes background scrolling on iOS/Android!)
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    // Lock body completely fixed on mobile browsers
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      // Restore original body state & scroll position on close
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Filter cast list by search query
  const filteredCast = useMemo(() => {
    if (!searchTerm.trim()) return movieCastNames;
    return movieCastNames.filter(
      (act) =>
        act.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.also_known_as?.some((aka) =>
          aka.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [movieCastNames, searchTerm]);

  // Handle actor click -> navigate directly to standalone /actor/:id page
  const handleActorClick = (actorId) => {
    onClose();
    navigate(`/actors/${actorId}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 text-left font-mono touch-none">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#12141a] border border-[#222533] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] h-[85vh] touch-auto">
        {/* Modal Header */}
        <div className="p-5 relative md:p-6 border-b border-[#1f2332] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0b0e] shrink-0">
          <div className="flex gap-2 items-center">
            <span className="w-1 h-20 bg-amber-400 rounded-sm" />
            <div>
              <div>
                <h2 className="whitespace-nowrap text-lg md:text-xl font-bold text-white font-mono uppercase tracking-wide">
                  DÀN DIỄN VIÊN
                </h2>
              </div>
              {movieTitle && (
                <p className="text-xs font-mono text-gray-400 mt-1">
                  Bộ phim:{" "}
                  <span className="text-white font-bold">{movieTitle}</span>
                </p>
              )}
              <span className="w-30 mt-2 flex justify-start items-center whitespace-nowrap text-amber-400 font-mono text-xs font-bold rounded-lg">
                {filteredCast.length} DIỄN VIÊN
              </span>
            </div>
          </div>

          {/* Controls: Search Bar & Close Button */}
          <div className="relative flex sm:w-64">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm diễn viên..."
              className="w-full bg-[#181a24] border border-[#252a3b] focus:border-amber-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 absolute right-0 top-0 hover:border-amber-400 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer shrink-0"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 60FPS Pure Native GPU-Accelerated Touch Momentum Scrolling */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden touch-pan-y overscroll-contain [-webkit-overflow-scrolling:touch] p-5 sm:p-10 scrollbar-none">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
            {filteredCast.map((act) => (
              <div
                key={act.id}
                onClick={() => handleActorClick(act.id)}
                className="bg-transparent m-1 sm:m-3 transition-transform duration-200 flex flex-col cursor-pointer items-center text-center group hover:scale-105"
              >
                <div className="w-20 h-20 sm:w-23 sm:h-23 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-amber-400 transition-all mb-2 relative">
                  <img
                    src={act.profile_path}
                    alt={act.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="text-xs font-bold text-white font-mono line-clamp-1 group-hover:text-amber-400 transition-colors">
                  {act.name}
                </h4>
                <span className="text-[10px] font-mono text-cyan-400 uppercase mt-0.5">
                  {act.known_for_department || "Acting"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
