import { Link } from "react-router-dom";
import { Layers } from "lucide-react";
import { formatUSD } from "../../utils/FormatUSD.js";

export default function FinancialDataTable({ rankedMovies }) {
  return (
    <div className="max-w-7xl mx-auto bg-[#12141a] border border-[#222533] rounded-2xl p-5 sm:p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white font-sans uppercase tracking-wide">
            Bảng Dữ Liệu Tài Chính Chi Tiết
          </h3>
        </div>
        <span className="text-xs font-mono text-gray-400">
          {rankedMovies.length} Bộ phim
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-[#222533] text-gray-400 text-[11px] uppercase tracking-wider">
              <th className="pb-3 px-3">RANK</th>
              <th className="pb-3 px-3">PHIM</th>
              <th className="pb-3 px-3">NĂM</th>
              <th className="pb-3 px-3 text-right">KINH PHÍ (BUDGET)</th>
              <th className="pb-3 px-3 text-right">DOANH THU (REVENUE)</th>
              <th className="pb-3 px-3 text-right">TỶ LỆ ROI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e2230]">
            {rankedMovies.map((movie, index) => {
              const rank = index + 1;
              const roi = movie.budget
                ? Math.round(
                    ((movie.revenue - movie.budget) / movie.budget) * 100,
                  )
                : 0;
              const isProfitable = roi >= 0;

              return (
                <tr
                  key={movie.id}
                  className="hover:bg-[#181b26] transition-colors group"
                >
                  <td className="py-3.5 px-3">
                    <span
                      className={`w-6 h-6 rounded-md inline-flex items-center justify-center font-bold text-[11px] ${
                        rank === 1
                          ? "bg-amber-400 text-black font-black"
                          : rank === 2
                            ? "bg-zinc-300 text-black"
                            : rank === 3
                              ? "bg-amber-700 text-white"
                              : "bg-[#1d212d] text-gray-400"
                      }`}
                    >
                      {String(rank).padStart(2, "0")}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-sans">
                    <Link
                      to={`/trailer/${movie.id}`}
                      className="flex items-center gap-3 group-hover:text-amber-400 font-bold text-white transition-colors"
                    >
                      <img
                        src={movie.image}
                        alt={movie.name}
                        className="w-8 h-12 object-cover rounded shrink-0 border border-white/10"
                      />
                      <span className="uppercase line-clamp-1">
                        {movie.name}
                      </span>
                    </Link>
                  </td>
                  <td className="py-3.5 px-3 text-gray-400">{movie.year}</td>
                  <td className="py-3.5 px-3 text-right text-cyan-400 font-semibold">
                    {formatUSD(movie.budget)}
                  </td>
                  <td className="py-3.5 px-3 text-right text-amber-400 font-bold">
                    {formatUSD(movie.revenue)}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        isProfitable
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-red-500/10 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {isProfitable ? `+${roi}%` : `${roi}%`}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
