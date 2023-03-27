import { PokemonDetails } from "../../types/pokemonDetailsTypes";
import { Link } from "react-router-dom";

import "./card.css";  

interface CardProps{
    pokemon: PokemonDetails;
}

export function Card({ pokemon }: CardProps){
    return(
        <div className="card">
            <Link to={`pokemon/${pokemon.id}`}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="sprite" />
            </Link>
            <p className="pokemon_name">{pokemon.name}</p>
        </div>
    )
}