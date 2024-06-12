
function Loader(){

    return(
        <div className="flex flex-col gap-4">
            <h1 className="p-4">Fetching Pokemon Details</h1>
            <div className="m-auto flex flex-row gap-2">
                <div className="h-4 w-4 animate-bounce rounded-full bg-blue-700 [animation-delay:.7s]"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-blue-700 [animation-delay:.3s]"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-blue-700 [animation-delay:.7s]"></div>
            </div>

        </div>
    )
}

export default Loader;

