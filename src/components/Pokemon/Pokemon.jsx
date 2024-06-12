function Pokemon({name, image}){
    return(
        <div className="flex flex-col justify-center items-center border p-4 rounded shadow-md">
            <div className="font-bold mb-2">{name}</div>
            <div><img src={image} alt={name} className="w-32 h-32  object-contain"/></div>
        </div>
    )
}

export default Pokemon;
