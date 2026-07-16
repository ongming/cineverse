import { Link } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ movie }) {
    return(
        <Link to={`/trailer/${movie.id}`} className="movie-card">
            <div className="movie-poster-wrapper">
                <img className="movie-poster" src={movie.image} alt={movie.name} />
                <span className="movie-rating">★ {movie.rating}</span>
            </div>
            
            <div className="movie-info">
                <h3 className="movie-detail-title">{movie.name}</h3>
                <span className="movie-year">{movie.year}</span>
            </div>
        </Link>
    )
}