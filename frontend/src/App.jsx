import { movies } from './data/movies.js'
import { useState } from 'react'
import Header from './components/Header/Header.jsx'
import MovieList from './components/MovieList/MovieList.jsx'
import './App.css'

function App() {
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('Tất cả');
    const handleSearch = (searchTerm) => {
        setSearchText(searchTerm.toLowerCase().trim());
        setCategory('Tất cả');
    };
    const Home = () => {
        setSearchText('');
        setCategory('Tất cả');
    }
    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
        setSearchText('');
    }
    const filteredMovies = movies.filter(movie => {
        if(category !== 'Tất cả') {
            return movie.genre.includes(category);
        }
        return movie.name.toLowerCase().includes(searchText);
    });

    return (
        <div className="App">
            <Header onSearch={handleSearch} onCategoryChange={handleCategoryChange} onHome={Home} />
            <article className="ListMovie">
                <MovieList movies={filteredMovies} />
            </article>
        </div>
    )   
}

export default App