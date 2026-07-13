import { useState } from 'react';
import './SearchBar.css';
import SearchIcon from '../../assets/icons/search-interface-symbol.png';

// 1. Nhận prop tên là onSearch
export default function SearchBar({ onSearch }) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(inputValue);
        }
    };

    return(
        <div className="search-bar-container">
            <div className="search-box">
                <img src={SearchIcon} className="search-icon" alt="Search" />
                <input 
                    type="text" 
                    placeholder="Tìm kiếm..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    )
}