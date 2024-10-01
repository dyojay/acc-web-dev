import { useState } from 'react'
import { generateRandoNum } from '../helper'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  // make this stuff work
  const [isSeven, setIsSeven]=useState(false);
  const handlelick=()=>{
  const randomNumber = generateRandoNum();
  setCount(randomNumber);
  setIsSeven(randomNumber ===7);
};



  return (
    <>
      {/* Get these basic items to show */}
      <h1>Devante's Casino!</h1>
      <h2>Try your luck</h2>
      <h3>{count}</h3>
      <div className="card">
        <button 
        // assign onclick to handleclick func
        style={{visibility:!isSeven ? "visible": "hidden"}}
         onClick={handlelick}> Click Me !!
        </button>
        {isSeven && <h1>You Win!!</h1>  }
      </div>
      
    </>
  );
}

export default App
