import { Link } from 'react-router-dom';
import pokelogo from '../../assets/poke-logo.png';

import './header.css';

export function Header(){
    return(
        <div className="header">
            <Link to={"/"}>
                <img src={pokelogo} alt="PokeAPI" className='pokelogo' />
            </Link>
        </div>
    )
}