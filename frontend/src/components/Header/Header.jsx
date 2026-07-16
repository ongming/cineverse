import Logo from '../../assets/images/logo.png'
import AuthStatus from '../AuthStatus/AuthStatus.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import Ranking from '../Ranking/Ranking.jsx'
import Category from '../Category/Category.jsx'
import { Routes, Route } from 'react-router-dom';
import './Header.css'
import { Link } from 'react-router-dom';

 export default function Header({ onSearch, onCategoryChange, onHome }) {
    return (
        <header>
            <nav>
                <Link to="/" className="logo-container" >             
                    <img className="logo" src={Logo} alt="Logo" onClick={onHome} />
                </Link>
                <div className="nav-items-container">
                    <Category onCategoryChange={onCategoryChange} />
                    <Ranking />
                </div>
                <div className="nav-tools-container">
                    <SearchBar onSearch={onSearch} />
                    <AuthStatus />
                </div>
            </nav>
        </header>
    )
}