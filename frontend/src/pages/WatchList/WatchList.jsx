import WatchListHeader from "./WatchListHeader.jsx";
import WatchListGridContainer from "./WatchListGridContainer.jsx";

export default function WatchList() {
  return (
    <div className="w-full min-h-screen bg-[#080808] text-white py-10 px-4 sm:px-8 xl:px-20 font-sans">
      {/* 🟢 1. Isolated Memoized Header Banner (0 Re-renders on search!) */}
      <WatchListHeader />

      {/* 🟢 2. Sub-Container handling state & isolated grid updates */}
      <WatchListGridContainer />
    </div>
  );
}
