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
            types : response.data.types.map((t) => t.type.name)
        })
        setLoading(false);
    }

    useEffect(() => {
        fetchPokeDetail();
    }, []);


    return(
        <div className="p-4 m-5 flex flex-col justify-center items-center border  rounded shadow-md hover:cursor-pointer hover:bg-slate-200">
            {loading ? <Loader/> : (<div>
                <h2 className="text-2xl">{pokemon.name }</h2>
                <img src={pokemon.image} alt={pokemon.name} />
                <h3 className="text-2xl">Height : {pokemon.height} </h3>
                <h3 className="text-2xl">Weight : {pokemon.weight} </h3>
                <div className="p-4">
                    <ul className="pl-4 flex flex-col gap-10 text-lg font-mono list-disc">
                        {pokemon.types && pokemon.types.map((t) => <div key={t} className="bg-slate-400 px-4 py-6   tracking-widest text-2xl rounded-full m-auto"> {t} </div>)}
                    </ul>
                </div>
                
            </div>)}
        </div>
    )
}

export default PokemonDetails;

