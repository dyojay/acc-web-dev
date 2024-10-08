import { useState } from 'react'
import './App.css'

function App() {
    const initPerson={
        fname:"",
        lname: "",
        age:21
    }
    const [personData,setPersonData]= useState({initPerson});


    const handleChange=(event)=> {
        setPersonData({...personData,[event.target.name]: event.target.value}); //example of bracket notation//
        // console.log(personData);
    }

    const handleSubmit=(event)=> {
        event.preventDefault(); //prevent page from auto refresh and actually submits the data
        console.log("Sending Data", personData)
        setPersonData(initPerson)
    }


    return (
    <>
        {/*submission form */}
<form onSubmit={handleSubmit}>
    <label htmlFor="fname"> First Name:
    <input type="text" name="fname" id="fname" value={personData.fname}  onChange={handleChange} required minLength={3} maxLength={5} autoComplete="off"/>
    </label>
    <label htmlFor="lname"> Last Name:
    <input type="text" name="lname" id="lname"  value={personData.lname} onChange={handleChange}   maxLength={5} autoComplete="off"/>
    </label>
    <buttonb>Submit</buttonb>
    <label htmlFor="age"> Age:
    <input type="number" name="age" id="age" value={personData.age}  onChange={handleChange} required  min={21} max={99} autoComplete="off"/>
    </label>
    <button>Submit</button>
</form>
    </>
  )

}
export default App;
