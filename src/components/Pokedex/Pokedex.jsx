import { useState } from "react";
import PokeList from "../PokeList/PokeList";
import Search from "../Search/Search";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

function Pokedex(){

    const [searchTerm, setSearchTerm] = useState('');

    return(
        <div className="flex flex-col items-center">
            
            <Search updateSearchTerm={setSearchTerm}/>
            {(searchTerm.length == 0) ? <PokeList/> : <PokemonDetails key={searchTerm} pokemonName={searchTerm}/>}
        </div>
    )
}

export default Pokedex;
