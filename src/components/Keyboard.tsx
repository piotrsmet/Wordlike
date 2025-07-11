import {DeleteKey, EnterKey, IsKeyValid, Key} from "./Key";
import React, {createContext, useContext, useEffect, useState } from "react";
import { WordleContext } from "./Wordle";
import words from "../assets/words.txt"

export function Keyboard() {
  const context = useContext(WordleContext)!
  const input = context?.input
  const currentRowId = context?.currentRowId
  const allRows = context?.allRows
  const flipRows = context?.flipRows
  const cardColors = context?.cardColors
  const [answer, setAnswer] = useState("adieu")
  const randomWord = Math.floor(Math.random() * 13000)
  
  useEffect(() =>{
    fetch(words)
      .then(r => r.text())
      .then(text => {setAnswer(text.split('\n')[randomWord])})
      
    }, []
  )

  
  const keys: string[][] = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ]; 

  
  let keyColorMap = new Map<string, IsKeyValid>(
    keys.flat().map((key) => [key, IsKeyValid.UNKNOWN])
  );

  const [keysColors, setKeyColors] = useState(keyColorMap);

  const handlePassValue = (value: string): void => {
    if (input[0].length < 5 && currentRowId[0] < 5) {
      const newInput = [...input[0], value];
      input[1](newInput);

      allRows[1]((prev) => {
        const updated = prev.map((row, i) =>
          i === currentRowId[0]
            ? [...newInput]
            : row
        );
        return updated;
      });
    }
  };

  const handleDeleteValue = (): void => {
    if(input[0].length>0){
      input[1]((prev) => prev.slice(0, prev.length-1))
      allRows[1]((prev) => {
        const updated = prev.map((row, i) =>
          i === currentRowId[0]
            ? [...input[0].slice(0, input[0].length-1)]
            : row
        );
        return updated;
      });
    }
  }

  const handleEnterValue = async (): Promise<void> => {
  if (currentRowId[0] < 5 && input[0].length === 5) {
    const guess = input[0].join("")
    const response = await fetch(`https://wordle-api-kappa.vercel.app/${guess}`, {
      method: "POST",
    });

    const data = await response.json();
    if (!data.is_word_in_list) {
      return
    }

    keyColorMap = keysColors;

    input[0].forEach((letter, index) => {
      if (answer.includes(letter)) {
        cardColors[1]((prev) => {
          const updated = [...prev]
          updated[currentRowId[0]][index] = IsKeyValid.PARTLY_VALID
          return updated
        });
      }

      if (letter === answer[index]) {
        keyColorMap.set(letter, IsKeyValid.VALID)
        cardColors[1]((prev) => {
          const updated = [...prev]
          updated[currentRowId[0]][index] = IsKeyValid.VALID
          return updated;
        })
      }

      if (keysColors.get(letter) !== IsKeyValid.VALID) {
        if (answer.includes(letter)) {
          keyColorMap.set(letter, IsKeyValid.PARTLY_VALID)
        } else {
          keyColorMap.set(letter, IsKeyValid.NOT_VALID)
        }
      }

      setKeyColors(new Map(keyColorMap));
    });

    flipRows[1]((prev) => {
      const updated = [...prev]
      updated[currentRowId[0]] = true
      return updated;
    });

    currentRowId[1](currentRowId[0] + 1)
    input[1]([])
  }
};




  return (
    <div className='flex-col justify-center text-[20px] w-[100%px] mt-3 h-[170px]'>
        {
          keys.map((arr, index) => 
            <div className="flex justify-center h-[30%]" key={`row-${index}`}>
              {
                arr.length == 7 && <EnterKey value="ENTER" enterValue={handleEnterValue}/>
              }
              {
                arr.map((key, letterIndex) =>
                  <Key key={`key-${letterIndex}`} value={key} passValue={handlePassValue} keyValidation={keysColors.get(key) ?? IsKeyValid.UNKNOWN}/>
                  
                )
              }
              {
                arr.length == 7 && <DeleteKey value={"DELETE"} deleteValue={handleDeleteValue}/> 
              }
              
            </div>
          )     
        }
    </div>
  );
}
