import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCategory } from "../../hooks/data/useCategory.js";

export default function SideCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: categories, isLoading } = useCategory();

  return (
    <div className="relative group">
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="py-2.5 px-3 rounded-lg flex items-center justify-between w-full text-gray-200 hover:text-cyan-neon hover:bg-[#1f1f1f] cursor-pointer transition-colors"
      >
        <span>Thể Loại</span>
        <ChevronDown
          className={`w-4 h-4 ${isOpen ? "rotate-180" : ""} transition-transform duration-300`}
        />
      </span>

      {isOpen && !isLoading && (
        <ul className="grid grid-cols-1 gap-x-2.5 gap-y-2 p-3 my-2 list-none m-0 text-white text-xs overflow-y-auto max-h-[160px] custom-category-scrollbar touch-pan-y overscroll-contain [-webkit-overflow-scrolling:touch]">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/category/${encodeURIComponent(category.name)}`}
                className="whitespace-nowrap text-left text-white no-underline hover:text-cyan-neon hover:scale-105 transition-all duration-400 block"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
