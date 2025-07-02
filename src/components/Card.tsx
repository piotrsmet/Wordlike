import { useState } from "react";
import '../App.css';

interface cardProps{
    cardLetter: string
}

export default function Card({cardLetter}: cardProps){
    
    return(
        <div className={' w-[20%] aspect-square m-2 items-center flex justify-center text-2xl flip-card'}>
            <div className={'flip-card-inner items-center justify-center'}>
                <div className={"flip-card-front items-center justify-center"}>{cardLetter}</div>
                <div className={"flip-card-back"}>{cardLetter}</div>
            </div>
        </div>
        
    )
    
}