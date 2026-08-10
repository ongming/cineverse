import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { categories } from "../../data/category.js";
import { useState } from "react";

export default function SideCategory() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="inline-block text-white hover:cursor-pointer hover:text-cyan-neon hover:scale-105 transition-all duration-400"
      >
        Thể Loại
        <ChevronDown
          className={`w-4 h-4 inline-block ml-1 ${isOpen ? "rotate-180" : ""} transition-transform duration-300`}
        />
      </span>

      {isOpen && (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 p-4 bg-dark-panel  rounded-lg list-none m-0 text-white">
          {categories.map((category) => (
            <li key={category}>
              <Link
                to={`/category/${encodeURIComponent(category)}`}
                className="whitespace-nowrap text-left text-white no-underline hover:text-cyan-neon hover:scale-105 transition-all duration-400 block"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
