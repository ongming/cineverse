import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="flex items-center bg-[#1a1a1a] border border-[#363636] rounded-full px-3.5 py-1.5 w-[250px] transition-colors hover:border-[#555555]">
        <Search className="w-4 h-4 mr-2.5 text-[#b0adad] shrink-0" />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="border-none bg-transparent outline-none text-white text-sm w-full placeholder:text-[#b0adad]"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </form>
  );
}
