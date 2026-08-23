import RevenueHeader from "./RevenueHeader.jsx";
import RevenueGridContainer from "./RevenueGridContainer.jsx";

export default function Revenue() {
  return (
    <div className="w-full min-h-screen bg-[#080808] text-white py-8 px-4 sm:px-8 xl:px-16 font-mono">
      {/* 🟢 1. Isolated Memoized Header Banner (0 Re-renders on filter/page change!) */}
      <RevenueHeader />

      {/* 🟢 2. Sub-Container handling state, permanently mounted toolbar & isolated grid updates */}
      <RevenueGridContainer />
    </div>
  );
}
