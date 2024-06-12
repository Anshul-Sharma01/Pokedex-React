import { useState } from 'react'
import Pokedex from './components/Pokedex/Pokedex';
import Search from './components/Search/Search';
import CustomRoutes from './routes/CustomRoutes';
import { Link } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0);

  return(
    <>
      <Link to={"/"}>
        <h1 className='text-center p-4 m-5 text-3xl bg-orange-300 font-bold font-mono tracking-widest w-full'>Pokedex</h1>
      </Link>
      <CustomRoutes/>
    </>
  )
}

export default App
