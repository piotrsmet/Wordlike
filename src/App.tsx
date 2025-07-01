import Row from './components/Row'
import './App.css'
import Keyboard from './components/Keyboard'

function App() {
  

  return (
    <>
      <div className=' border-amber-300 border-4 w-[clamp(300px,60vw,500px)]'>
        <Row id={0}/>
        <Row id={1}/>
        <Row id={2}/>
        <Row id={3}/>
        <Row id={4}/>
        <Keyboard/>
      </div>
      
    </>
  )
}

export default App
