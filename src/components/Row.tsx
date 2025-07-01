import Card from './Card'
import { useState } from 'react';

interface RowProps{
    id: number,
}


export default function Row({id}: RowProps){ 

    return(
        <div className='border-4 flex w-100%'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    )
}