import './Category.css';

export default function Category({ onCategoryChange }) {
    const categories = [
        'Hành Động',
        'Hài Hước',
        'Kinh Dị',
        'Tình Cảm',
        'Hoạt Hình',
        'Phiêu Lưu',
        'Châm Biếm',
        'Học Đường',
        'Thể Thao',
        'Võ Thuật',
        'Âm Nhạc',
        'Khoa Học',
        'Viễn Tưởng'
    ];
    return(
        <div className="category">
            <span className="category-title">
                Thể Loại
            </span>
            <div className="dropdown-menu">
                <ul>
                    {/* 1. Thêm dấu ngoặc nhọn { } bọc ngoài */}
                    {categories.map(category => (
                        // 2. Thêm key={category} vào thẻ li
                        <li key={category} onClick={() => onCategoryChange(category)}>
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}