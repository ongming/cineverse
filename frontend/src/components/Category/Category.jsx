import { Link } from "react-router-dom"; // 1. Nhớ import Link
import "./Category.css";

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
    <div className="category">
      <span className="category-title">Thể Loại</span>
      <div className="dropdown-menu">
        <ul>
          {categories.map((category) => (
            // 2. Đặt 'key' ở thẻ <li> ngoài cùng để chuẩn React
            // 3. Cấu trúc <ul> -> <li> -> <Link> để chuẩn HTML
            <li key={category}>
              <Link to={`/category/${encodeURIComponent(category)}`}>
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
