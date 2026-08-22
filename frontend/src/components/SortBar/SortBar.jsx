import { memo, useRef } from "react";
import { ChevronDown } from "lucide-react";
import useClickOutside from "../../hooks/ui/HandleClickOutside.js";

function SortBar({
  isSortOpen,
  setIsSortOpen,
  sortOptions,
  sortBy,
  setSortBy,
  Icon = null,
}) {
  const sortRef = useRef(null);

  useClickOutside(sortRef, () => setIsSortOpen(false));

  return (
    <div className="relative w-full sm:w-60 shrink-0 " ref={sortRef}>
      <button
        type="button"
        onClick={() => setIsSortOpen(!isSortOpen)}
        className="w-full sm:w-60 px-4 py-2.5 bg-[#16181b] border border-[#232736] hover:border-amber-400/50 rounded-lg text-xs font-mono text-gray-300 hover:text-white flex items-center justify-between gap-3 cursor-pointer transition-all"
      >
        {Icon}
        <span className="font-bold text-amber-400">
          {sortOptions.find((o) => o.value === sortBy)?.label}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
            isSortOpen ? "rotate-180 text-amber-400" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isSortOpen && (
        <div className="absolute w-full max-h-48 overflow-y-auto right-0 top-full mt-2 w-48 bg-[#12141a] border border-[#282d3e] rounded-sm shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setSortBy(opt.value);
                setIsSortOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-mono transition-colors cursor-pointer ${
                sortBy === opt.value
                  ? "bg-amber-400/15 text-amber-400 font-bold"
                  : "text-gray-300 hover:bg-[#1a1e2b] hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(SortBar);
