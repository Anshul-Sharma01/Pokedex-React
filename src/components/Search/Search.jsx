import useDebounce from "../../hooks/useDebounce";



function Search({updateSearchTerm}){
    const debouncedCallback = useDebounce((e) => updateSearchTerm(e.target.value, 500));
    return(
        <div className="p-4 w-full flex justify-center">
            <input type="text" className="p-4 w-2/6" placeholder="Enter pokemon name.." onChange={debouncedCallback}/>
        </div>
    )
}

export default Search;
