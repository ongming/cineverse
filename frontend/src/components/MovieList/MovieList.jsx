import './MovieList.css';
import {Routes, Route} from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard.jsx';

export default function MovieList({ movies }) {
    return(
        <section className="movie-list-container">
            <div className="movie-list-title">
                <h2>Danh sách Trailer phim</h2>
            </div>
            <div className="movie-grid">
                {movies.map(movie => {
                    return <MovieCard key={movie.id} movie={movie} />;
                })}
            </div>
        </section>
    )
}