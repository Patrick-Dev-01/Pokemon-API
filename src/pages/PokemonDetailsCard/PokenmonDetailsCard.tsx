import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { HeartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from "axios";
import { PokemonDetails } from "../../types/pokemonDetailsTypes";

import "./pokemonDetailsCard.css";
import { Link } from "react-router-dom";

export function PokemonDetailsCard(){
    // Recover pokemon id
    const { id } = useParams();
    const [pokemon, setPokemon] = useState<PokemonDetails>();

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
            setPokemon(response.data);            
        });
    }, []);

    return (
        <>
            <Header />
            <div className="detailsCardContainer">
                <button className="back">
                    <Link to={"/"}>
                        <ArrowLeftOutlined />
                        <span>Back</span>
                    </Link>
                </button>
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
                <button type="button" className="add_favorites">Add Favorites</button>
            </div>
        </>
    );
}