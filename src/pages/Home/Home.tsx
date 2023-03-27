import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from "../../components/Card/Card";
import { Header } from "../../components/Header/Header";
import { PokemonData, Pokemon } from '../../types/pokemonsTypes';
import { PokemonDetails } from '../../types/pokemonDetailsTypes';
import { DoubleLeftOutlined, DoubleRightOutlined, SearchOutlined } from "@ant-design/icons";

import "./home.css";

export function Home(){
    // State to Storage all data return
    const [pokemonData, setPokemonData] = useState<PokemonDetails[]>([]);
    // State to storage pokemon Data and list
    const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
    const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
    const [nextPage, setNextPage] = useState<string>('');
    const [prevPage, setPrevPage] = useState<string>('');
    const [count, setCount] = useState(0);

    // Execute useEffect every time when "url" state change
    useEffect(() => {
        axios.get<PokemonData>(url).then(response => {
            const pokemons: Pokemon[] = response.data.results;
            const pokemonDetails: PokemonDetails[] = [];

            // Make a concurrency HTTP request (multiple request in row)
            axios.all(pokemons.map(pokemon => axios.get(pokemon.url))).then(resp => {
                // iterate every data return 
                resp.map(response => {
                    pokemonDetails.push(response.data);
                });

                // Alphabetic order 
                pokemonDetails.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });

                // Storage the data which will be listed to user
                setPokemonData(pokemonDetails);
                // Storage all data return
                setPokemonList(pokemonDetails);
            });
            
            // Setting the pagination url
            setPrevPage(response.data.previous);
            setNextPage(response.data.next);
            setCount(response.data.count);
        }).catch(err => {
            console.log(err);
        });
    }, [url]);

    // Search the pokemon on current list
    function findPokemon(pokemon: string){
        setPokemonList(pokemonData.filter(p => p.name.includes(pokemon)));
    }

    return(
       <div className='container'>
            <Header />
            <main>
                <div className='search'>
                    <input type="text" name="search" id="search" onInput={(e) => { findPokemon(e.currentTarget.value) }} />
                    <button type='submit'>
                        <SearchOutlined />
                    </button>
                </div>

                <section>
                    <div className="cardlist">
                        { pokemonList.map(pokemon => (
                            <Card key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </div>                    
                    <div className='previous_next'>
                        <button type='button' onClick={() => setUrl(prevPage)}>
                            <DoubleLeftOutlined />
                            <span>Previous</span>
                        </button>

                        <button type='button' onClick={() => setUrl(nextPage)}>
                            <span>Next</span>
                            <DoubleRightOutlined />
                        </button>
                    </div>
                </section>
            </main>
       </div>
    );
}