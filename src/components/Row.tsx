import Card from './Card'
import { useState } from 'react';

interface RowProps{
    id: number,
    letters: string[]
}


export default function Row({id, letters}: RowProps){ 
    return(
        <div className='border-4 flex w-100%'>
            <Card cardLetter={letters[0]}/>
            <Card cardLetter={letters[1]}/>
            <Card cardLetter={letters[2]}/>
            <Card cardLetter={letters[3]}/>
            <Card cardLetter={letters[4]}/>
        </div>
    )
}