import React from 'react';
import { diceValue } from '../helper';

function Dice({ value, isRattling }) {
    return (
        <div className={`dice ${isRattling ? 'rattle' : ''}`}>
            <i className={`fas fa-dice-${diceValue[value]}`}></i>
        </div>
    );
}

export default Dice;