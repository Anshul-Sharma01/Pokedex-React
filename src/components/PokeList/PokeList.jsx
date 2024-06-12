import { useEffect, useState } from "react";
import axios from 'axios';
import Loader from "../Loader/Loader";
import Pokemon from "../Pokemon/Pokemon";

function PokeList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon";

    async function PokemonData(){
        const response = await axios.get(POKEDEX_URL);
        const pokeResult = response.data.results;
        const pokeResultPromise = pokeResult.map((pokemon) => axios.get(pokemon.url));
        const pokeData = await axios.all(pokeResultPromise);
        const res = (pokeData.map((pokemonData) => {
            const pokemon = pokemonData.data;
            return {id : pokemon.id, name : pokemon.name,
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other.front_shiny, types:pokemon.types}
        }))
        setPokemonList(res);
        setIsLoading(false);
    }

    useEffect(() => {
        PokemonData();
    },[])

    return(
        <div className="m-auto flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">PokeList</h1>
            <div className="flex flex-row justify-center items-center flex-wrap gap-20 md:grid-cols-2 lg:grid-cols-3 ">
                {isLoading ? <Loader/> : pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)}
            </div>
        </div>
    )
}

export default PokeList;
