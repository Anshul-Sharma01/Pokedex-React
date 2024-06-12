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
        // console.log(response.data);
        const pokeResult = response.data.results;
        const pokeResultPromise = pokeResult.map((pokemon) => axios.get(pokemon.url));
        const pokeData = await axios.all(pokeResultPromise);
        // console.log(pokeData);
        const res = (pokeData.map((pokemonData) => {
            const pokemon = pokemonData.data;
            return {id : pokemon.id, name : pokemon.name,
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other.front_shiny, types:pokemon.types}
        }))
        setPokemonList(res);
        console.log(res);
        setIsLoading(false);
    }

    useEffect(() => {
        PokemonData();
    },[])

    return(
        <div className="m-5">
            <h1>PokeList</h1>
            {(isLoading) ? <Loader/> : pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)}
        </div>
    )
}

export default PokeList;


