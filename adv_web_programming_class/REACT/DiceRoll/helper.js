import React from "react";



export function generateRandoNum() {
    return Math.floor(Math.random() * 6);
  }
  
  // Array of dice face names
 const diceValue = ["one", "two", "three", "four", "five", "six"];

 export {diceValue};