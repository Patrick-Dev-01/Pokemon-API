import React, { useState, createContext, ReactNode } from "react";

interface FavoritesContextData{
    favorites: number[];
    addFavorites: (id: number) => void;
    removeFavorite: (id: number) => void;
}

interface FavoritesProviderProps{
    children: ReactNode;
}

export const FavoritesContext = createContext({} as FavoritesContextData);

export function FavoritesContextProvider({ children }: FavoritesProviderProps){
    // Storage favorites 
    const [favorites, setFavorites] = useState<number[]>([]);

    function addFavorites(id: number){
        setFavorites([...favorites, id]);
    }

    function removeFavorite(id: number){
        setFavorites(favorites.filter(favoriteId => favoriteId !== id));
    }

    return(
        <FavoritesContext.Provider value={{
            favorites,
            addFavorites,
            removeFavorite
        }}>
            { children }
        </FavoritesContext.Provider>
    );
}