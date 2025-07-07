
import {DeleteKey, EnterKey, IsKeyValid, Key} from "./Key";
import React, {createContext, useContext, useState } from "react";


interface keyboardProps{
  input: [string[], React.Dispatch<React.SetStateAction<string[]>>],
  currentRowId: [number, React.Dispatch<React.SetStateAction<number>>],
  allRows: [string[][], React.Dispatch<React.SetStateAction<string[][]>>],
  flipRows: [boolean[], React.Dispatch<React.SetStateAction<boolean[]>>],
  cardColors: [IsKeyValid[][], React.Dispatch<React.SetStateAction<IsKeyValid[][]>>]
}

export function Keyboard({input, currentRowId, allRows, flipRows, cardColors}: keyboardProps) {
  

  const keys: string[][] = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ];
  const answer = "abcde"
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

  const handleEnterValue = (): void => {
    if(currentRowId[0] < 5 && input[0].length == 5){

      keyColorMap = keysColors

      input[0].forEach((letter, index) => {

        if(answer.search(letter) !== -1){
          cardColors[1]((prev) => {prev[currentRowId[0]][index] = IsKeyValid.PARTLY_VALID; return prev})
        }
        
        if(letter == answer[index]){
          console.log("valid")
          keyColorMap.set(letter, IsKeyValid.VALID)
          cardColors[1]((prev) => {prev[currentRowId[0]][index] = IsKeyValid.VALID; return prev})
        }
        if(keysColors.get(letter) !== IsKeyValid.VALID){
          if(answer.search(letter) !== -1){
            keyColorMap.set(letter, IsKeyValid.PARTLY_VALID)
          }
          else{
            keyColorMap.set(letter, IsKeyValid.NOT_VALID)
          }
        }
        
        setKeyColors(keyColorMap)
      })
      
      flipRows[1]((prev) => {prev[currentRowId[0]] = true; return prev})
      console.log(flipRows[0])

      currentRowId[1](currentRowId[0]+1)
      input[1]([])
      

    }
    
  }



  return (
    <div className="flex-col justify-center text-[20px] w-[100%px] mt-3">
        {
          keys.map((arr) => 
            <div className="flex justify-center">
              {
                arr.length == 7 && <EnterKey value="en" enterValue={handleEnterValue}/>
              }
              {
                arr.map((key) =>
                  <Key value={key} passValue={handlePassValue} keyValidation={keysColors.get(key) ?? IsKeyValid.UNKNOWN}/>
                  
                )
              }
              {
                arr.length == 7 && <DeleteKey value={"xx"} deleteValue={handleDeleteValue}/> 
              }
              
            </div>
          )     
        }
    </div>
  );
}
