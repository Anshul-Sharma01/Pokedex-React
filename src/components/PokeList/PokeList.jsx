import { useEffect, useState } from "react";
import axios from 'axios';
import Loader from "../Loader/Loader";
import Pokemon from "../Pokemon/Pokemon";

function PokeList(){

    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [pokedexURL, setPokedexURL] = useState("https://pokeapi.co/api/v2/pokemon");
    // const [prevURL, setPrevURL ] = useState("");
    // const [nextURL, setNextURL ] = useState("");

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList : [],
        isLoading : true,
        pokedexURL : 'https://pokeapi.co/api/v2/pokemon',
        nextUrl : '',
        prevURL : ''
    });

    async function PokemonData(){
        setPokemonListState((state) => ({...state, isLoading : true}));
        
        const response = await axios.get(pokemonListState.pokedexURL);
        const pokeResult = response.data.results;
        setPokemonListState((state) => ({...state, nextUrl : response.data.next, prevURL : response.data.previous}))

        const pokeResultPromise = pokeResult.map((pokemon) => axios.get(pokemon.url));

        const pokeData = await axios.all(pokeResultPromise);

        const res = (pokeData.map((pokemonData) => {
            const pokemon = pokemonData.data;
            return {id : pokemon.id, name : pokemon.name,
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other.front_shiny, types:pokemon.types}
        }))

        setPokemonListState((state) => ({...state, pokemonList : res, isLoading : false}));

    }

    useEffect(() => {
        PokemonData();
    },[pokemonListState.pokedexURL]);

    return(
        <div className="m-auto flex flex-col items-center">
            <div className="flex flex-row justify-center items-center flex-wrap gap-16">
                {pokemonListState.isLoading ? <Loader/> : pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
            </div>
            
            <div className=" flex gap-10 p-10 m-5">
                
                <button className="bg-orange-300 px-6 py-3 text-black font-bold font-mono border-solid border-black border-2 hover:bg-orange-700 hover:text-white" disabled={pokemonListState.prevURL == null} onClick={() => {
                    const urlToSet = pokemonListState.prevURL;
                    setPokemonListState({...pokemonListState, pokedexURL : urlToSet})
                }}  >Prev</button>
                <button className="bg-orange-300 px-6 py-3 text-black font-bold font-mono  border-solid border-black border-2 hover:bg-orange-700 hover:text-white" disabled={pokemonListState.nextUrl == null}  onClick={() => {
                    const urlToSet = pokemonListState.nextUrl;
                    setPokemonListState({...pokemonListState, pokedexURL : urlToSet})
                }}>Next</button>
            </div>
        </div>
    )
}

export default PokeList;
