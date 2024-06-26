import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";


function PokemonDetails(){

    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);

    async function fetchPokeDetail(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
            name :  response.data.name,
            image : response.data.sprites.other.dream_world.front_default,
            weight : response.data.weight,
            height : response.data.height,
            stats : response.data.stats,
            types : response.data.types.map((t) => t.type.name)
        })
        setLoading(false);
    }

    useEffect(() => {
        fetchPokeDetail();
    }, []);


    return(
        <div className="flex justify-center items-center">
            <div className="w-2/5 border-solid border-2 rounded-lg p-10 shadow-slate-300 shadow-lg hover:cursor-pointer hover:bg-slate-200">
                {loading ? <Loader/> : (
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h2 className="text-2xl font-mono capitalize text-center p-6 bg-slate-400 text-white font-bold rounded-lg ">{pokemon.name }</h2>
                        <img src={pokemon.image} alt={pokemon.name} />
                        <h3 className="text-2xl">Height : {pokemon.height} </h3>
                        <h3 className="text-2xl">Weight : {pokemon.weight} </h3>
                        <div className="p-4">
                            <ul className=" list-none pl-4 flex flex-row gap-4 text-lg font-mono">
                                {pokemon.types && pokemon.types.map((t) => <li key={t} className="bg-indigo-400 px-4 py-2 tracking-widest text-xl rounded-full m-auto hover:bg-blue-400 hover:text-white"> {t} </li>)}
                            </ul>
                        </div>
                        <div className="p-4">
                            <ul className="list-none w-fit pl-4 flex gap-2 text-lg font-mono flex-wrap">
                                {pokemon.stats && pokemon.stats.map((st) => <li key={st.base_stat} className="bg-red-400 px-4 py-2 tracking-widest text-xl rounded-full m-auto hover:bg-blue-400 hover:text-white"> 
                                    <div className="w-fit">{st.stat.name}:{st.base_stat}</div>
                                </li>)}
                            </ul>
                        </div>
                </div>)}
            </div>
        </div>
    )
}

export default PokemonDetails;

