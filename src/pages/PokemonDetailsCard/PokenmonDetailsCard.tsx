import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { HeartOutlined } from '@ant-design/icons';
import axios from "axios";
import { PokemonDetails } from "../../types/pokemonDetailsTypes";

import "./pokemonDetailsCard.css";

export function PokemonDetailsCard(){
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
                    Back
                </button>
                <div className="pokemonCard">
                    <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
                </div>
                <span></span>
            </div>
        </>
    );
}