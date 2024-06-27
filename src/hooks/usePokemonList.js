import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(type) {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexURL: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevURL: '',
        type: type || ''
    });

    async function PokemonData() {
        setPokemonListState((state) => ({...state, isLoading: true}));
        
        if(pokemonListState.type){
            const response = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonListState.type}`);
            setPokemonListState((state) => ({
                ...state,
                pokemonList: response.data.pokemon.map(p => ({ id: p.pokemon.url.split('/').slice(-2, -1)[0], name: p.pokemon.name })),
                isLoading: false
            }));
        } else {
            const response = await axios.get(pokemonListState.pokedexURL);
            const pokeResult = response.data.results;
            setPokemonListState((state) => ({...state, nextUrl: response.data.next, prevURL: response.data.previous}));
            const pokeResultPromise = pokeResult.map((pokemon) => axios.get(pokemon.url));

            const pokeData = await axios.all(pokeResultPromise);

            const res = (pokeData.map((pokemonData) => {
                const pokemon = pokemonData.data;
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other?.dream_world?.front_default || pokemon.sprites.other.front_shiny,
                    types: pokemon.types
                };
            }));

            setPokemonListState((state) => ({...state, pokemonList: res, isLoading: false}));
        }
    }
    
    useEffect(() => {
        PokemonData();
    }, [pokemonListState.pokedexURL, pokemonListState.type]);

    return [
        pokemonListState, setPokemonListState 
    ];
}

export default usePokemonList;
