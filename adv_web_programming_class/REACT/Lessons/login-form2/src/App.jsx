import { useState } from 'react'
import './App.css'
import {personObj} from './helper'

function App() {
  // const [fname, setFname] = useState("DY")
  // const [age, setAge] = useState("32")
  // const [pw, setPw] = useState("")
// cosnt [person, setPerson]= useState({
//   fname:"Dy",
//   age:32,
//   pw:"",
// });

const personObj ={
  fname: "DY",
  age:32,
  pw: ""
}
const [person, setPerson]= useState(personObj)
  return(
    <form action="/getdata" method="get">
      <label  >First Name:
      <input type="text" name="" id="" />
      </label>
      <label >Age:
      <input type="number" name="" id="" />
      </label>
      <label >Password:
      <input type="password" name="" id="" />
      </label>
      <button type="submit" >Submit</button>
      </form>
  )
}

export default App
