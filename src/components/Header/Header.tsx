import { Link } from 'react-router-dom';
import pokelogo from '../../assets/poke-logo.png';

import './header.css';

export function Header(){
    return(
        <div className="header">
            <Link to={"/"}>
                <img src={pokelogo} alt="PokeAPI" className='pokelogo' />
            </Link>

            <ul>
                <li><Link to={"/"}>Pokemons</Link></li>
                <li><Link to={"/favorites"}>Favorites</Link></li>
            </ul>
        </div>
    )
}