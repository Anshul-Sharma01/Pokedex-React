import usePokemonList from "../../hooks/usePokemonList";
import Loader from "../Loader/Loader";
import Pokemon from "../Pokemon/Pokemon";

function PokeList(){

    const [pokemonListState, setPokemonListState] = usePokemonList(false);


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
