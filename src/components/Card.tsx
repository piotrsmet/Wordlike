import { useState } from "react";
import '../App.css';

export default function Card(){
    const[flipped, setFlipped] = useState(false);

    
    return(
        
        <div className={' w-[20%] aspect-square m-2 items-center flex justify-center text-2xl flip-card'}>
            <div className={'flip-card-inner'}>
                <div className={"flip-card-front"}></div>
                <div className={"flip-card-back"}></div>
            </div>
        </div>
        
    )
    
}