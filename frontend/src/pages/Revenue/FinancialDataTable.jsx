import { Link } from "react-router-dom";
import { Layers } from "lucide-react";
import { formatUSD } from "../../utils/revenueUtils.js";
import PaginationControls from "../../components/PaginationControls/PaginationControls.jsx";

export default function FinancialDataTable({ rankedMovies, page, setPage , total_movies}) {
  return (
    <div className="max-w-7xl mx-auto bg-[#12141a] border border-[#222533] rounded-2xl p-2 sm:p-6 shadow-2xl py-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wide">
            Bảng Dữ Liệu Tài Chính Chi Tiết
          </h3>
        </div>
        <span className="text-xs font-mono text-gray-400">
          {total_movies} Bộ phim
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-[#222533] text-gray-400 text-[11px] uppercase tracking-wider">
              <th className="pb-3 px-3 whitespace-nowrap">PHIM</th>
              <th className="pb-3 px-3 whitespace-nowrap">NGÀY RA MẮT</th>
              <th className="pb-3 px-3 text-right whitespace-nowrap">KINH PHÍ</th>
              <th className="pb-3 px-3 text-right whitespace-nowrap">DOANH THU</th>
              <th className="pb-3 px-3 text-right whitespace-nowrap">TỶ LỆ ROI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e2230]">
            {rankedMovies?.map((movie, index) => {
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
                 
                  <td className="py-3.5 px-3 font-mono">
                    <Link
                      to={`/trailer/${movie.id}`}
                      className="flex items-center gap-3 group-hover:text-amber-400 font-bold text-white transition-colors"
                    >
                      <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="hidden sm:block w-8 h-12 object-cover rounded shrink-0 border border-white/10"
                      />  
                      <span className="uppercase line-clamp-1">
                        {movie.title}
                      </span>
                    </Link>
                  </td>
                  <td className="py-3.5 px-3 text-gray-400">{movie.release_date}</td>
                  <td className="py-3.5 px-3 text-right text-md md:text-lg text-cyan-400 font-semibold">
                    {formatUSD(movie.budget)}
                  </td>
                  <td className="py-3.5 px-3 text-right text-md md:text-lg text-amber-400 font-bold">
                    {formatUSD(movie.revenue)}
                  </td>
                  <td className="py-3.5 px-3 text-md md:text-lg text-right">
                    <span
                      className={`px-2.5 py-1 font-bold ${
                        isProfitable
                          ? " text-emerald-400"
                          : " text-red-400"
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
        <PaginationControls page={page} setPage={setPage} hasMore={rankedMovies?.length < 20} />
      </div>
    </div>
  );
}
