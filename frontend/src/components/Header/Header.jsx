 import Logo from '../../assets/images/logo.png'
 import AuthStatus from '../AuthStatus/AuthStatus.jsx'
 import SearchBar from '../SearchBar/SearchBar.jsx'
 import Ranking from '../Ranking/Ranking.jsx'
 import Category from '../Category/Category.jsx'
 import './Header.css'

 export default function Header({ onSearch, onCategoryChange, onHome }) {
    return (
        <header>
            <nav>
                <div className="logo-container">
                    <img className="logo" src={Logo} alt="Logo" onClick={onHome} />
                </div>
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