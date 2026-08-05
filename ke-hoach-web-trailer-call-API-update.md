# Kế hoạch triển khai: Web xem trailer phim mới nhất

## 1. Mục tiêu
Xây dựng web hiển thị trailer phim mới nhất, dữ liệu đồng bộ tự động từ TMDb API vào database riêng, không gọi API trực tiếp từ frontend.

## 2. Kiến trúc tổng quan
```
TMDb API  --(cron job đồng bộ)-->  MySQL DB  --(REST API)-->  Frontend (React)
```
- Frontend KHÔNG gọi TMDb trực tiếp, chỉ gọi backend của mình.
- Trailer nhúng qua YouTube iframe, không host file video.

## 3. Tech stack
- Backend: Node.js + Express
- DB: MySQL
- Cron: node-cron
- Frontend: React
- Nguồn data: TMDb API (cần API key free, đăng ký tại themoviedb.org)

## 4. Schema DB
```sql
CREATE TABLE movies (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  release_date DATE,
  poster_path VARCHAR(255),
  overview TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE trailers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT,
  youtube_key VARCHAR(50),
  name VARCHAR(255),
  published_at DATETIME,
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);
```

## 5. Các giai đoạn triển khai

### Giai đoạn 1 — Setup nền tảng
- [ ] Đăng ký TMDb API key (free, non-commercial)
- [ ] Khởi tạo project Node.js + Express
- [ ] Kết nối MySQL, tạo schema ở mục 4
- [ ] Setup biến môi trường (.env): `TMDB_API_KEY`, `DB_HOST`, `DB_USER`, `DB_PASS`

### Giai đoạn 2 — Module đồng bộ dữ liệu (cron job)
- [ ] Viết hàm gọi `GET /movie/now_playing` và `GET /movie/upcoming`
- [ ] Với mỗi phim, gọi `GET /movie/{id}/videos`, lọc `type=Trailer & site=YouTube`
- [ ] Upsert vào bảng `movies`, insert (tránh trùng) vào bảng `trailers`
- [ ] Set cron chạy định kỳ (vd: mỗi 6 tiếng) bằng node-cron
- [ ] Thêm delay/batch nhỏ giữa các request để tránh vượt rate limit TMDb (~40-50 req/s)
- [ ] Log lỗi khi request fail (không để cron job chết ngang)

### Giai đoạn 3 — REST API backend
- [ ] `GET /api/trailers/latest` — danh sách trailer mới nhất (sort theo `published_at`)
- [ ] `GET /api/movies/:id` — chi tiết phim + trailer
- [ ] `GET /api/trailers/search?q=` — tìm kiếm theo tên phim
- [ ] Phân trang (limit/offset hoặc cursor-based)

### Giai đoạn 4 — Frontend
- [ ] Trang danh sách trailer mới nhất (grid poster + tên phim)
- [ ] Trang chi tiết phim, nhúng iframe YouTube trailer
- [ ] Thanh tìm kiếm
- [ ] Responsive layout

### Giai đoạn 5 — Hoàn thiện & tuân thủ điều khoản
- [ ] Thêm credit bắt buộc ở footer: "This product uses the TMDB API but is not endorsed or certified by TMDB."
- [ ] Review lại: không host video, không lưu trữ ảnh/poster đem bán, không dùng chung với pipeline AI/ML xử lý data TMDb (điều khoản TMDb hiện cấm việc này)
- [ ] Nếu sau này có ads/thu phí → xin license thương mại từ TMDb trước khi public

### Giai đoạn 6 (tuỳ chọn) — Mở rộng
- [ ] Thêm nguồn YouTube Data API để bắt trailer "nóng" hơn TMDb (do kênh hãng phim đăng)
- [ ] Cache tầng Redis cho endpoint `/latest` nếu traffic lớn
- [ ] Deploy: backend (Render/Railway) + DB (PlanetScale/Railway MySQL) + frontend (Vercel)

## 6. Cách dùng kế hoạch này với AI
Khi bắt đầu từng giai đoạn, đưa file này cho AI kèm câu lệnh kiểu:
> "Đây là kế hoạch của tôi, hãy giúp tôi làm Giai đoạn 2 — viết cron job đồng bộ dữ liệu, dùng Node.js + Express + MySQL."

AI sẽ bám theo đúng schema, tech stack, và thứ tự đã định sẵn thay vì đề xuất kiến trúc khác mỗi lần hỏi.
