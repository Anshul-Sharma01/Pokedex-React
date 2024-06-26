import { useEffect, useState } from "react";
import axios from 'axios';
import Loader from "../Loader/Loader";
import Pokemon from "../Pokemon/Pokemon";

function PokeList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokedexURL, setPokedexURL] = useState("https://pokeapi.co/api/v2/pokemon");
    const [prevURL, setPrevURL ] = useState("");
    const [nextURL, setNextURL ] = useState("");

    async function PokemonData(){
        setIsLoading(true);
        const response = await axios.get(pokedexURL);
        const pokeResult = response.data.results;
        setPrevURL(response.data.previous);
        setNextURL(response.data.next);
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
    },[pokedexURL]);

    return(
        <div className="m-auto flex flex-col items-center">
            <div className="flex flex-row justify-center items-center flex-wrap gap-16">
                {isLoading ? <Loader/> : pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
            </div>
            <div className=" flex gap-10 p-10 m-5">
                
                <button className="bg-orange-300 px-6 py-3 text-black font-bold font-mono border-solid border-black border-2 hover:bg-orange-700 hover:text-white" disabled={prevURL == undefined} onClick={() => setPokedexURL(prevURL) }  >Prev</button>
                <button className="bg-orange-300 px-6 py-3 text-black font-bold font-mono  border-solid border-black border-2 hover:bg-orange-700 hover:text-white" disabled={nextURL === undefined}  onClick={() =>  setPokedexURL(nextURL) }>Next</button>
            </div>
        </div>
    )
}

export default PokeList;
