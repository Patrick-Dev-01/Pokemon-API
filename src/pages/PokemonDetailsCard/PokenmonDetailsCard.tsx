import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { HeartOutlined, ArrowLeftOutlined, HeartFilled } from '@ant-design/icons';
import axios from "axios";
import { PokemonDetails } from "../../types/pokemonDetailsTypes";

import "./pokemonDetailsCard.css";
import useFavorites from "../../hooks/useFavorite";
import { Footer } from "../../components/Footer/Footer";

export function PokemonDetailsCard(){
    // Recover pokemon id
    const { id } = useParams();
    const { addFavorites, removeFavorite, checkIsFavorite } = useFavorites();
    const [pokemon, setPokemon] = useState<PokemonDetails>();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
            setPokemon(response.data);
        });
    }, []);

    useEffect(() => {
        setIsFavorite(checkIsFavorite(String(id)));
    }, [addFavorites, removeFavorite]);

    return (
        <>
            <Header />
            <div className="detailsCardContainer">
                <section className="cardBlock">    
                    <div className="pokemonCard">
                        <h2>{ pokemon?.name }</h2>
                        <img src={pokemon?.sprites.front_default} alt={pokemon?.name} className='pokemonsprite' />
                        <div className="atributtes">
                            <ul>
                                <li>Base Experience - <strong>{pokemon?.base_experience}</strong></li>
                                <li>Weight - <strong>{pokemon?.weight}</strong></li>
                                <li>Height - <strong>{pokemon?.weight}</strong></li>
                            </ul>

                            <h3>Combat Stats</h3>
                            <ul>
                                { pokemon?.stats.map(stats => (
                                    <li key={stats.stat.name}>{stats.stat.name} - <strong>{stats.base_stat}</strong></li>
                                ))}
                            </ul>

                            <h3>Skills</h3>
                            <ul>
                                { pokemon?.abilities.map(skill => (
                                    <li key={skill.slot}><strong>{skill.ability.name}</strong></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    { isFavorite ? 
                        <button type="button" className="buttons_favorites" onClick={() => removeFavorite(String(id), pokemon)}>
                            <span><HeartFilled />Remove</span>
                        </button> : 
                        <button type="button" className="buttons_favorites" onClick={() => addFavorites(pokemon)}>
                            <span><HeartOutlined />Add Favorites</span>
                        </button> 
                    }
                </section>
            </div>
            <Footer />
        </>
    );
}