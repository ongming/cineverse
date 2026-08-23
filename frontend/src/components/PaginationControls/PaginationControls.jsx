import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({
  scrollRef = null,
  page,
  setPage,
  hasMore,
  isPaged = 1,
}) {
  if (isPaged === 0) {
    return null; // Hide pagination controls if there are no more items
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);

    // 2. Smoothly scroll screen to top of table!
    scrollRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex items-center justify-center gap-3 my-10 font-mono text-xs">
      {/* ⬅️ PREVIOUS PAGE BUTTON */}
      <button
        type="button"
        disabled={page === 1} // 🟢 Cannot go below page 1
        onClick={() => handlePageChange(page - 1)}
        className="px-2.5 py-2.5 bg-[#141722] border border-[#23283a] text-gray-300 hover:border-amber-400 hover:text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* 🔢 CURRENT PAGE BADGE */}
      <span className="px-4 py-2.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 font-bold rounded-xl">
        {page}
      </span>

      {/* ➡️ NEXT PAGE BUTTON */}
      <button
        type="button"
        disabled={hasMore} // 🟢 Disable if last page has less than 20 items
        onClick={() => handlePageChange(page + 1)}
        className="px-2.5 py-2.5 bg-[#141722] border border-[#23283a] text-gray-300 hover:border-amber-400 hover:text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
