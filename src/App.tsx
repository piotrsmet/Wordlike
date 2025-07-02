import Row from './components/Row'
import './App.css'
import Keyboard from './components/Keyboard'
import { use, useState } from 'react'

function App() {
  const[text, setText] = useState<string[]>([]) 
  const[currentRow, setCurrentRow] = useState<number>(0)
  const [allRows, setAllRows] = useState<string[][]>([
  [], [], [], [], []
  ])

  return (
    <>
      <div className=' border-amber-300 border-4 w-[clamp(300px,60vw,500px)]'>
        <Row id={0} letters={allRows[0]}/>
        <Row id={1} letters={allRows[1]}/>
        <Row id={2} letters={allRows[2]}/>
        <Row id={3} letters={allRows[3]}/>
        <Row id={4} letters={allRows[4]}/>
        <Keyboard input={[text, setText]} currentRowId={[currentRow, setCurrentRow]} allRows={[allRows, setAllRows]}/>
      </div>
      
    </>
  )
}

export default App
