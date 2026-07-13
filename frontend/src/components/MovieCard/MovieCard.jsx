import './MovieCard.css';

export default function MovieCard({ movie }) {
    return(
        <div className="movie-card">
            {/* 1. Phần chứa ảnh poster và điểm đánh giá */}
            <div className="movie-poster-wrapper">
                <img className="movie-poster" src={movie.image} alt={movie.name} />
                <span className="movie-rating">★ {movie.rating}</span>
            </div>
            
            {/* 2. Phần chứa thông tin chữ bên dưới ảnh */}
            <div className="movie-info">
                <h3 className="movie-title">{movie.name}</h3>
                <span className="movie-year">{movie.year}</span>
            </div>
        </div>
    )
}