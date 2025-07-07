import { useContext, useEffect, useState } from "react";
import '../App.css';
import { IsKeyValid } from "./Key";


interface cardProps{
    id: number,
    cardLetter: string,
    flip: boolean,
    color: IsKeyValid
}

export default function Card({id, cardLetter, flip, color}: cardProps){
    
    let cardInnnerStyle = 'flip-card-inner items-center justify-center '
    switch(id){
        case 1:
            cardInnnerStyle = cardInnnerStyle.concat('delay1 ')
            break
        case 2:
            cardInnnerStyle = cardInnnerStyle.concat('delay2 ')
            break
        case 3:
            cardInnnerStyle = cardInnnerStyle.concat('delay3 ')
            break
        case 4:
            cardInnnerStyle = cardInnnerStyle.concat('delay4 ')

    }
    switch(color){
        case IsKeyValid.VALID:
            cardInnnerStyle = cardInnnerStyle.concat('bg-green-700 ')
            break
        case IsKeyValid.PARTLY_VALID:
            cardInnnerStyle = cardInnnerStyle.concat('bg-orange-600 ')
            break
        case IsKeyValid.NOT_VALID:
            cardInnnerStyle = cardInnnerStyle.concat('bg-gray-600 ')
            break
        case IsKeyValid.UNKNOWN:
            cardInnnerStyle = cardInnnerStyle.concat('bg-gray-600 ')
            break
    }
    if(flip){
        cardInnnerStyle = cardInnnerStyle.concat('flip-card-inner-flip')
    }
    return(

        <div className={' w-[20%] aspect-square m-2 flip-card items-center flex justify-center text-2xl'}>
            <div className={cardInnnerStyle}>
                <div className={"flip-card-front items-center justify-center content-center"}>{cardLetter ? cardLetter.toUpperCase() : ""}</div>
                <div className={"flip-card-back content-center"}>{cardLetter ? cardLetter.toUpperCase() : ""}</div>
            </div>
        </div>
        
    )
    
}