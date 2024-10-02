import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // setCount(count +1)
  useEffect(()=>{
    if (count < 5){
      setCount(count +1)
    }
  }, [count, doogy, cat])
  return (
    <>
      <h1>My Counter Demo with use effect</h1>
      Count: {count}
    </>
  )
}

export default App
