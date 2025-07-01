import Key from "./Key";
import { useState } from "react";

export default function Keyboard() {
  const [text, setText] = useState<string[]>([]);

  const handlePassValue = (value: string): void => {
    setText((prev) => [...prev, value]);
  };
  const keys: string[][] = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ];

  return (
    <div className="flex-col justify-center text-[20px] border-2">
        <div>{text}</div>
        {
          keys.map((arr) => 
            <div className="flex justify-center">
              {
                arr.map((key) =>
                  <Key value={key} passValue={handlePassValue} />
                )
              }
            </div>
          )     
        }
    </div>
  );
}
