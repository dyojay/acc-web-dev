import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import axios  from "axios";
import DogImageCard from '../DogImageCard';
import { Button,Stack  } from '@mui/material';
const App = () => {
  
//consuming an api
//http request using axios
//click a btn
//get a rando dog img
//ex of fetch w/ js built in -- fetch(endpoint) .then(response)get a response .then(parseData)do something with data .catch(error)handles errors

// diffrence between axio and fetch is that axios automatically parseData

const [dogImage, setDogImage]= useState("")
const endpoint = `https://dog.ceo/api/breeds/image/random`
const handleClick =()=>{
  console.log("Clicked");
  axios
  .get(endpoint)
  .then(response => setDogImage(response.data.message))
  .catch((error) =>{
    console.error("Error: ", error.message)},[]); 
};
 
useEffect(()=>{
  axios
  .get(endpoint)
  .then(response => setDogImage(response.data.message))
  .catch((error) =>{
    console.error("Error: ", error.message);
  });
},[]);

  return (
    <>
    <h1>Rando Dog Img Generator</h1>
    <DogImageCard imagePath={dogImage}/>
   <div>
   <Stack direction="row" spacing={2}>
      <Button variant="text" color="warning">Secondary</Button>
      <Button size="small" variant="contained" color="success">
        Success
      </Button>
      <Button variant="contained" color="error">
        Error
      </Button>
    </Stack>
    <button onClick={handleClick} >Click Me</button>
    </div> 
    </>
  )
}

export default App
