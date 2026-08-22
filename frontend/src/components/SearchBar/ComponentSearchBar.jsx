import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/ui/useDebounce.js";
function ComponentSearchBar({ onClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);

  useEffect(() => {
    onClick(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="relative flex-1 min-w-[220px] max-w-xs">
      <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Tìm kiếm Trailer..."
        className="w-full bg-[#07080c] border border-white/10 focus:border-cyan-400 text-xs text-white placeholder-gray-500 rounded-xl pl-9 pr-4 py-2 focus:outline-none transition-all font-sans"
      />
    </div>
  );
}

export default ComponentSearchBar;
