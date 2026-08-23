import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import useClickOutside from "../../hooks/ui/HandleClickOutside.js";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Tự động active con trỏ vào ô nhập khi mở kính lúp
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 🟢 Use your existing useClickOutside hook
  useClickOutside(searchContainerRef, () => setIsOpen(false));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setInputValue("");
    setIsOpen(false);
  };

  return (
    <form
      ref={searchContainerRef}
      onSubmit={handleSubmit}
      className="flex items-center shrink-0"
    >
      <div
        className={`flex items-center  rounded-full transition-all duration-300 hover:border-[#555555] overflow-hidden ${
          isOpen
            ? "w-[200px] lg:w-[160px] xl:w-[250px] 2xl:w-[350px] px-3.5 py-1.5 border border-cyan-neon/50 "
            : "w-9 h-9 justify-center cursor-pointer hover:scale-110 hover:text-cyan-neon"
        }`}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        <Search className="w-4 h-4 " />
        {isOpen && (
          <>
            <input
              ref={inputRef}
              type="text"
              placeholder="Tìm kiếm..."
              className="border-none bg-transparent outline-none text-white text-sm w-full ml-2.5 placeholder:text-[#b0adad]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="button"
              onClick={handleClear}
              className="bg-transparent border-none p-0 ml-1 text-[#b0adad] hover:text-white cursor-pointer flex items-center justify-center shrink-0"
              title="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </form>
  );
}
