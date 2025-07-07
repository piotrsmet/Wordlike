import Card from './Card'
import { useState } from 'react';
import type { IsKeyValid } from './Key';

interface RowProps{
    letters: string[],
    flip: boolean,
    answerColors: IsKeyValid[]
}


export default function Row({letters, flip, answerColors}: RowProps){ 
    return(
        <div className='flex w-100%'>
            <Card id = {0} cardLetter={letters[0]} flip={flip} color={answerColors[0]}/>
            <Card id = {1} cardLetter={letters[1]} flip={flip} color={answerColors[1]}/>
            <Card id = {2} cardLetter={letters[2]} flip={flip} color={answerColors[2]}/>
            <Card id = {3} cardLetter={letters[3]} flip={flip} color={answerColors[3]}/>
            <Card id = {4} cardLetter={letters[4]} flip={flip} color={answerColors[4]}/>
        </div>
    )
}