import { useState } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom"; // Thay Link bằng useNavigate
import SearchIcon from "../../assets/icons/search-interface-symbol.png";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate(); // Khởi tạo hàm điều hướng

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang khi submit form
    if (inputValue.trim()) {
      // Chỉ chuyển hướng khi nhấn Enter (hoặc submit form) và có nhập chữ
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      <div className="search-box">
        <img src={SearchIcon} className="search-icon" alt="Search" />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </form>
  );
}
