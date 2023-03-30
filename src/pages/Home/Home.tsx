import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from "../../components/Card/Card";
import { Header } from "../../components/Header/Header";
import { PokemonData, Pokemon } from '../../types/pokemonsTypes';
import { PokemonDetails } from '../../types/pokemonDetailsTypes';
import { DoubleLeftOutlined, DoubleRightOutlined, SearchOutlined } from "@ant-design/icons";

import "./home.css";
import { Footer } from '../../components/Footer/Footer';

export function Home(){
    // State to Storage all data return
    const [pokemonData, setPokemonData] = useState<PokemonDetails[]>([]);
    // State to storage pokemon Data and list
    const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
    const [pokemonName, setPokemonName] = useState<string>('');
    const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
    const [nextPage, setNextPage] = useState<string>('');
    const [prevPage, setPrevPage] = useState<string>('');
    const [count, setCount] = useState(0);

    // Execute useEffect every time when "url" state change
    useEffect(() => {
        getAllPokemons();
    }, [url]);

    // Search the pokemon on current list
    function findPokemon(pokemon: string){
        setPokemonName(pokemon);
        setPokemonList(pokemonData.filter(p => p.name.includes(pokemon)));
    }

    // get All Pokemons
    function getAllPokemons(){
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
                setPokemonList(pokemonDetails);
                // Storage all data return
                setPokemonData(pokemonDetails);
            });
            
            // Setting the pagination url
            setPrevPage(response.data.previous);
            setNextPage(response.data.next);
            setCount(response.data.count);
        }).catch(err => {
            console.log(err);
        });
    }

    // Get Single pokemon
    function getPokemon(){
        if(pokemonName !== ""){
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(response => {
                // Storage the data which will be listed to user
                setPokemonList([response.data]);
                // Storage all data return
                setPokemonData([response.data]);
            }).catch(err => {
                console.log(err);
            });
        }

        else{
            getAllPokemons();
        }
    }

    return(
        <>
            <div className='container'>
                <Header />
                <main>
                    <div className='search'>
                        <input type="text" name="search" id="search" placeholder='Search in current list or fetch by name...' 
                            onInput={(e) => { findPokemon(e.currentTarget.value) }} 
                        />
                        <button type='submit' onClick={getPokemon}>
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

                <Footer />
            </div>
        </>
    );
}