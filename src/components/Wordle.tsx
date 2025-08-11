import React, { createContext, useEffect } from 'react'
import Row from './Row'
import { Keyboard } from './Keyboard'
import { useState } from 'react'
import { IsKeyValid } from './Key'
import GameFinished from './GameOver'

interface WordleContextProps {
	input: [string[], React.Dispatch<React.SetStateAction<string[]>>]
	currentRowId: [number, React.Dispatch<React.SetStateAction<number>>]
	allRows: [string[][], React.Dispatch<React.SetStateAction<string[][]>>]
	flipRows: [boolean[], React.Dispatch<React.SetStateAction<boolean[]>>]
	cardColors: [
		IsKeyValid[][],
		React.Dispatch<React.SetStateAction<IsKeyValid[][]>>
	]
	finished: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
	word: [string, React.Dispatch<React.SetStateAction<string>>]
	restart: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export const WordleContext = createContext<WordleContextProps | null>(null)

export function Wordle() {
	const [text, setText] = useState<string[]>([])
	const [currentRow, setCurrentRow] = useState<number>(0)
	const [allRows, setAllRows] = useState<string[][]>([[], [], [], [], []])
	const [flipRow, setFlipRow] = useState<boolean[]>([
		false,
		false,
		false,
		false,
	])
	const [answerColors, setAnswerColors] = useState<IsKeyValid[][]>([
		[
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
		],
		[
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
		],
		[
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
		],
		[
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
		],
		[
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
			IsKeyValid.UNKNOWN,
		],
	])

	

	const [finished, setFinished] = useState(false)
	const [word, setWord] = useState("")
	const [restart, setRestart] = useState(false)

	useEffect(() => {
		if(restart == true){
		window.location.reload()
		}
	}, [restart])

	const contextValue: WordleContextProps = {
		input: [text, setText],
		currentRowId: [currentRow, setCurrentRow],
		allRows: [allRows, setAllRows],
		flipRows: [flipRow, setFlipRow],
		cardColors: [answerColors, setAnswerColors],
		finished: [finished, setFinished],
		word: [word, setWord],
		restart: [restart, setRestart]
	}

	return (
		<>
			<div className='flex flex-col items-center justify-center min-h-screen text-white select-none'>
				<WordleContext.Provider value={contextValue}>
					<div className='w-[clamp(350px,60vw,500px)]'>
						<Row
							letters={allRows[0]}
							flip={flipRow[0]}
							answerColors={answerColors[0]}
						/>
						<Row
							letters={allRows[1]}
							flip={flipRow[1]}
							answerColors={answerColors[1]}
						/>
						<Row
							letters={allRows[2]}
							flip={flipRow[2]}
							answerColors={answerColors[2]}
						/>
						<Row
							letters={allRows[3]}
							flip={flipRow[3]}
							answerColors={answerColors[3]}
						/>
						<Row
							letters={allRows[4]}
							flip={flipRow[4]}
							answerColors={answerColors[4]}
						/>
						<Keyboard />
					</div>
					{finished && <GameFinished/>}
				</WordleContext.Provider>
			</div>
		</>
	)
}
