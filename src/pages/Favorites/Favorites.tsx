import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Card } from "../../components/Card/Card";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import useFavorites from "../../hooks/useFavorite";
import { PokemonDetails } from "../../types/pokemonDetailsTypes";
 
export function Favorites(){
    const { favoritesPokemonData } = useFavorites();
    const [favoritesPokemonList, setFavoritesPokemonList] = useState<PokemonDetails[]>(favoritesPokemonData);

    function findFavoritePokemon(pokemon: string){
        setFavoritesPokemonList(favoritesPokemonData.filter(p => p.name.includes(pokemon)));
    } 

    return(
        <>
            <Header />
            <div className='container'>
                <main>
                    <div className='search'>
                        <input type="text" name="search" id="search" placeholder='Search pokemon in current list...' onInput={(e) => { findFavoritePokemon(e.currentTarget.value) }} />
                        <button type='submit'>
                            <SearchOutlined />
                        </button>
                    </div>

                    <section>
                        <div className="cardlist">
                            { favoritesPokemonList.map(pokemon => (
                                <Card key={pokemon.id} pokemon={pokemon} />
                            ))}
                        </div>                    
                    </section>
                </main>
            </div>
            <Footer />
        </>
    )
}