import { useContext } from "react"
import { WordleContext } from './Wordle'

export default function GameFinished() {
	const context = useContext(WordleContext)
	return (
		<div className='fixed z-100 bg-black/50 w-[100vw] h-[100vh] flex items-center justify-center'>
			<div className='bg-amber-600 p-10 rounded-2xl flex flex-col space-y-4 justify-center items-center'><p>The answer was "{context?.word[0]}"</p>
				<div className='bg-green-400 w-30 h-10 rounded-xl cursor-pointer flex items-center justify-center' onClick={()=>{context?.restart[1](true)}}><p>Play Again</p></div>
			</div>
			
		</div>
	)
}
