import { Link } from "react-router-dom";

function Pokemon({name, image, id}){
    return(
        <div className="flex flex-col justify-center items-center border p-4 rounded-lg shadow-md hover:cursor-pointer hover:bg-slate-200 ">
            <Link to={`/pokemon/${id}`}>
                <div className="font-bold mb-2 tracking-widest">{name}</div>
                <div><img src={image} alt={name} className="w-36 h-36  object-contain"/></div>
            </Link>
        </div>
    )
}

export default Pokemon;
