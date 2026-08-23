// components/Common/LoadingState.jsx
export default function LoadingState({
  message = "ĐANG TẢI DỮ LIỆU CINEVERSE...",
  fullScreen = true,
}) {
  return (
    <div
      className={`w-full bg-[#080808] text-white flex flex-col items-center justify-center gap-4 font-mono select-none ${
        fullScreen ? "min-h-screen" : "py-16"
      }`}
    >
      {/* Animated Dual Glow Spinner */}
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
        <div className="absolute inset-0 w-12 h-12 border-4 border-cyan-400/10 border-b-cyan-400 rounded-full animate-spin [animation-duration:1.5s]" />
      </div>

      {/* Pulsing Text Prompt */}
      <p className="text-xs text-gray-400 uppercase tracking-widest animate-pulse m-0">
        {message}
      </p>
    </div>
  );
}
