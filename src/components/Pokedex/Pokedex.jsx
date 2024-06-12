import PokeList from "../PokeList/PokeList";
import Search from "../Search/Search";

function Pokedex(){
    return(
        <div className="flex flex-col items-center">
            <h1 className='text-center p-4 m-5 text-3xl bg-orange-300 font-bold font-mono tracking-widest w-full'>Pokedex</h1>
            <Search/>
            <PokeList/>
        </div>
    )
}

export default Pokedex;
