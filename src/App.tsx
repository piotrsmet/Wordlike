import Row from './components/Row'
import './App.css'
import {Keyboard} from './components/Keyboard'
import { createContext, use, useState } from 'react'
import { IsKeyValid } from './components/Key'


export function App() {
  const [text, setText] = useState<string[]>([]) 
  const [currentRow, setCurrentRow] = useState<number>(0)
  const [allRows, setAllRows] = useState<string[][]>([[], [], [], [], []])
  const [flipRow, setFlipRow] = useState<boolean[]>([false, false, false, false])
  const [answerColors, setAnswerColors] = useState<IsKeyValid[][]>([
    [IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN],
    [IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN],
    [IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN],
    [IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN],
    [IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN, IsKeyValid.UNKNOWN]
  ])

  return (
    <>
      <div className=' w-[clamp(350px,60vw,500px)]'>
        
          <Row id={0} letters={allRows[0]} flip={flipRow[0]} answerColors={answerColors[0]}/>
          <Row id={1} letters={allRows[1]} flip={flipRow[1]} answerColors={answerColors[1]}/>
          <Row id={2} letters={allRows[2]} flip={flipRow[2]} answerColors={answerColors[2]}/>
          <Row id={3} letters={allRows[3]} flip={flipRow[3]} answerColors={answerColors[3]}/>
          <Row id={4} letters={allRows[4]} flip={flipRow[4]} answerColors={answerColors[4]}/>
          <Keyboard input={[text, setText]} currentRowId={[currentRow, setCurrentRow]} allRows={[allRows, setAllRows]} flipRows={[flipRow, setFlipRow]} cardColors={[answerColors, setAnswerColors]}/>
        
      </div>
      
    </>
  )
}

