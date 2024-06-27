import { useState, useEffect } from "react";
import axios from "axios";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id) {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const [pokemonListState, setPokemonListState] = usePokemonList();

    async function fetchPokeDetail() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const types = response.data.types.map((t) => t.type.name);
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            stats: response.data.stats,
            types: types
        });
        setLoading(false);
        setPokemonListState((state) => ({...state, type: types[0]})); // Set the type to the first type of the Pokémon
    }

    useEffect(() => {
        fetchPokeDetail();
    }, [id]);

    return [loading, pokemon, pokemonListState];
}

export default usePokemonDetails;
