import PokeList from "../PokeList/PokeList";
import Search from "../Search/Search";

function Pokedex(){
    return(
        <div className="flex flex-col items-center">
            
            <Search/>
            <PokeList/>
        </div>
    )
}

export default Pokedex;
