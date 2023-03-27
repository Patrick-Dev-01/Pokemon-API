
export interface Pokemon{
    name: string;
    url: string;
}

export interface PokemonData{
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}