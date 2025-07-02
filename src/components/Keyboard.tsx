import {DeleteKey, EnterKey, IsKeyValid, Key} from "./Key";
import React, { isValidElement, useState } from "react";


interface keyboardProps{
  input: [string[], React.Dispatch<React.SetStateAction<string[]>>],
  currentRowId: [number, React.Dispatch<React.SetStateAction<number>>],
  allRows: [string[][], React.Dispatch<React.SetStateAction<string[][]>>]
}

export default function Keyboard({input, currentRowId, allRows}: keyboardProps) {
  
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
      currentRowId[1](currentRowId[0]+1)
      input[0].forEach((letter, index) => {
        if(letter == answer[index]){
          console.log("valid")
          keyColorMap.set(letter, IsKeyValid.VALID)
          setKeyColors(keyColorMap)
        }
      })
      input[1]([])
      

    }
  }



  return (
    <div className="flex-col justify-center text-[20px] border-2">
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
