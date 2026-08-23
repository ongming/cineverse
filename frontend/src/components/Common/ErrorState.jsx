// components/Common/ErrorState.jsx
import { Link } from "react-router-dom";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";

export default function ErrorState({
  title = "Không thể tải dữ liệu!",
  message = "Vui lòng kiểm tra kết nối mạng và thử lại sau.",
  onRetry = null,
  backLink = "/",
  backText = "QUAY LẠI TRANG CHỦ",
  fullScreen = true,
}) {
  return (
    <div
      className={`w-full bg-[#080808] text-white flex flex-col items-center justify-center p-4 font-mono select-none ${
        fullScreen ? "min-h-screen" : "py-16"
      }`}
    >
      <div className="max-w-md w-full bg-[#12141a] border border-[#222533] rounded-2xl p-6 sm:p-8 text-center shadow-2xl space-y-4">
        {/* Alert Icon */}
        <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Title & Description */}
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-amber-400 uppercase tracking-wide m-0 mb-2">
            {title}
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed m-0">
            {message}
          </p>
        </div>

        {/* Action Buttons (Retry + Navigation Link) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>THỬ LẠI</span>
            </button>
          )}

          {backLink && (
            <Link
              to={backLink}
              className="px-4 py-2.5 bg-[#181a24] hover:bg-[#222636] border border-[#252a3b] hover:border-amber-400/50 text-gray-300 hover:text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all no-underline active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{backText}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
