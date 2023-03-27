export interface Forms{
    name: string;
    url: string
}

export interface Sprites{
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}

export interface Abilities{
    ability: {
        name: string; 
        url: string;
    }
    name: string;
    url: string
    is_hidden: boolean;
    slot: number;
}

export interface Stats{
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}

export interface PokemonDetails{
    abilities: Abilities[];
    base_experience: number;
    forms: Forms[];
    height: number;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    name: string;
    order: number;
    past_types: any[];
    species: {}
    sprites: Sprites;
    stats: Stats[];
    weight: number;
}
