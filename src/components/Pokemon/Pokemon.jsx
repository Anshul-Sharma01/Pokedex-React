
function Pokemon({name, image}){
    return(
        <>
            <div>Name : {name}</div>
            <div><img src={image} alt={name} /></div>
        </>
    )
}

export default Pokemon;


