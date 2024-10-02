import { useState, useEffect } from "react";
import Dice from "../components/Dice";
import { generateRandoNum } from "../helper";
import "./App.css";

export default function App() {
  const [diceValues, setDiceValues] = useState([0, 0]);
  const [sum, setSum] = useState(2);
  const [isRattling, setIsRattling] = useState([false,false]);


  const rollDice = () => {
    setIsRattling([true,false]);
    setTimeout(()=> setIsRattling([true,true]), 50);
    setTimeout(()=>{
      const newValues = [
        generateRandoNum(), 
        generateRandoNum()
      ];
    setDiceValues(newValues);
    setIsRattling([false,false]);
    }, 500);
    
  };

  // useEffect to handle initial roll and sum calculation
  useEffect(() => {
    // Initial roll when component mounts
    rollDice();
  }, []); // Empty dependency array means this effect runs once on mount

  // useEffect to calculate sum whenever dice values change
  useEffect(() => {
    const newSum = diceValues[0] + diceValues[1] + 2; // Adding 2 because values are 0-5, but dice are 1-6
    setSum(newSum);
  }, [diceValues]); // This effect runs whenever diceValues changes

  return (
    <div className="App">
      <div className="dice-container">
      <Dice value={diceValues[0]} isRattling={isRattling[0]} />
      <Dice value={diceValues[1]} isRattling={isRattling[1]} />
      </div>
      <button onClick={rollDice}>
        Roll Dice
      </button>
      <p>Sum: {sum}</p>

    </div>
  );
}
