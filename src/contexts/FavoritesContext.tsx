import { useState, createContext, ReactNode } from "react";
import { PokemonDetails } from "../types/pokemonDetailsTypes";

interface FavoritesContextData{
    favoritesPokemonData: PokemonDetails[];
    addFavorites: (pokemon?: PokemonDetails,) => void;
    removeFavorite: (id: string, pokemon?: PokemonDetails) => void;
    checkIsFavorite: (id: string) => boolean;
}

interface FavoritesProviderProps{
    children: ReactNode;
}

export const FavoritesContext = createContext({} as FavoritesContextData);

export function FavoritesContextProvider({ children }: FavoritesProviderProps){
    // Storage favorites 
    const [favoritesPokemonData, setFavoritesPokemonData] = useState<PokemonDetails[]>([]);
    const [favoritesId, setFavoritesId] = useState<String[]>([]);

    function addFavorites(pokemon?: PokemonDetails){
        if(pokemon){
            setFavoritesPokemonData([...favoritesPokemonData, pokemon]);
            setFavoritesId([...favoritesId, String(pokemon.id)]);

            localStorage.setItem("favorites", String(favoritesId));
        }
    }

    function removeFavorite(id: string, pokemon?: PokemonDetails){
        setFavoritesPokemonData(favoritesPokemonData.filter(favorite => favorite.id !== Number(id)));
        setFavoritesId(favoritesId.filter(favoriteId => favoriteId !== id));

        localStorage.setItem("favorites", String(pokemon?.id));
    }

    function checkIsFavorite(id: string){
        const pokemonId = favoritesPokemonData.find(favorite => favorite.id === Number(id));

        if(pokemonId){
            return true;
        }

        else{
            return false;
        }
    }

    return(
        <FavoritesContext.Provider value={{
            favoritesPokemonData,
            addFavorites,
            removeFavorite,
            checkIsFavorite        
        }}>
            { children }
        </FavoritesContext.Provider>
    );
}