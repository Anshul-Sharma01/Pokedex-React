import { useState } from 'react'
import Pokedex from './components/Pokedex/Pokedex';
import Search from './components/Search/Search';


function App() {
  const [count, setCount] = useState(0);

  return(
    <>
      
      <Pokedex/>
    </>
  )
}

export default App
