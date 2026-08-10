import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { categories } from "../../data/category.js";

export default function Category() {
  return (
    <div className="relative group">
      <span className="inline-block text-white hover:cursor-pointer hover:-translate-y-1.5 hover:text-cyan-neon hover:scale-105 transition-all duration-400">
        Thể Loại
        <ChevronDown className="w-4 h-4 inline-block ml-1 group-hover:rotate-180 transition-transform duration-300" />
      </span>
      <div className="hidden group-hover:block absolute top-full left-0 w-175 z-999 pt-2.5">
        <ul className="grid grid-cols-5 gap-x-5 gap-y-2.5 p-4 bg-[#0d0d0d] border border-[#222222] rounded-lg shadow-2xl list-none m-0 text-white">
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
      </div>
    </div>
  );
}
