import { Link } from "react-router-dom";

export default function Category() {
  const categories = [
    "Hành Động",
    "Hài Hước",
    "Kinh Dị",
    "Tình Cảm",
    "Hoạt Hình",
    "Phiêu Lưu",
    "Châm Biếm",
    "Học Đường",
    "Thể Thao",
    "Võ Thuật",
    "Âm Nhạc",
    "Khoa Học",
    "Viễn Tưởng",
  ];

  return (
    <div className="relative group">
      <span className="text-white hover:cursor-pointer hover:text-amber-500 transition-colors">Thể Loại</span>
      <div className="hidden group-hover:block absolute top-full left-0 w-[700px] z-[999] pt-2.5">
        <ul className="grid grid-cols-5 gap-x-[20px] gap-y-[10px] p-4 bg-[#0d0d0d] border border-[#222222] rounded-lg shadow-2xl list-none m-0 text-white">
          {categories.map((category) => (
            <li key={category}>
              <Link
                to={`/category/${encodeURIComponent(category)}`}
                className="whitespace-nowrap text-left text-white no-underline hover:text-amber-500 transition-colors block"
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
