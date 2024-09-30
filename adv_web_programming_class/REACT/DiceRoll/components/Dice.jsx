import React from 'react';
import { diceValue } from '../helper';

function Dice ({value}) {
    return(
        <i className={`fas fa-dice-${diceValue[value]}`}></i>
    );
}

export default Dice;