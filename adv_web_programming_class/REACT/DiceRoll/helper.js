import React from "react";



export function generateRandoNum() {
    return Math.floor(Math.random() * 5)+1;
  }
  
 const diceValue = ["one", "two", "three", "four", "five", "six"];

 export {diceValue};