import { DeleteKey, EnterKey, IsKeyValid, Key } from './Key'
import { useContext, useEffect, useState } from 'react'
import { WordleContext } from './Wordle'
import words from '../assets/words.txt'
import Toast from './Toast'

export function Keyboard() {
	const invalidWord = "This word doesn't exist"
	const context = useContext(WordleContext)!
	const input = context?.input
	const currentRowId = context?.currentRowId
	const allRows = context?.allRows
	const flipRows = context?.flipRows
	const cardColors = context?.cardColors
	const [answer, setAnswer] = useState('adieu')
	const randomWord = Math.floor(Math.random() * 13000)
	const [allWords, setAllWords] = useState<String[]>([])
	const [showToast, setShowToast] = useState(false)

	useEffect(() => {
		fetch(words)
			.then(r => r.text())
			.then(text => {
				setAnswer(text.split('\n')[randomWord])
				setAllWords(text.split('\n'))
			})
	}, [])

	const keys: string[][] = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['z', 'x', 'c', 'v', 'b', 'n', 'm'],
	]

	let keyColorMap = new Map<string, IsKeyValid>(
		keys.flat().map(key => [key, IsKeyValid.UNKNOWN])
	)

	const [keysColors, setKeyColors] = useState(keyColorMap)

	//Funkcja obsługująca wpisywanie liter
	const handlePassValue = (value: string): void => {
		console.log(input[0])
		if (input[0].length < 5 && currentRowId[0] < 5) {
			const newInput = [...input[0], value]
			input[1](newInput)

			allRows[1](prev => {
				const updated = prev.map((row, i) =>
					i === currentRowId[0] ? [...newInput] : row
				)
				return updated
			})
		}
	}

	//Funkcja obsługująca usuwanie
	const handleDeleteValue = (): void => {
		if (input[0].length > 0) {
			input[1](prev => prev.slice(0, prev.length - 1))
			allRows[1](prev => {
				const updated = prev.map((row, i) =>
					i === currentRowId[0]
						? [...input[0].slice(0, input[0].length - 1)]
						: row
				)
				return updated
			})
		}
	}

	//Funkcja ustawiająca kolory kafelków
	const setColors = () => {
		let checkedColors = new Map<String, number>()
		for (let i = 0; i < 5; i++) {
			if (checkedColors.get(answer[i]) === undefined) {
				checkedColors.set(answer[i], 1)
			} else {
				checkedColors.set(
					input[0][i],
					checkedColors.get(input[0][i])! + 1
				)
			}
		}
		console.log(checkedColors)

		for (let i = 0; i < 5; i++) {
			if (input[0][i] === answer[i]) {
				cardColors[1](prev => {
					const updated = [...prev]
					updated[currentRowId[0]][i] = IsKeyValid.VALID
					return updated
				})
				checkedColors.set(
					input[0][i],
					checkedColors.get(input[0][i])! - 1
				)
			}
		}

		for (let i = 0; i < 5; i++) {
			if (
				answer.includes(input[0][i]) &&
				checkedColors.get(input[0][i]) !== 0 &&
				input[0][i] !== answer[i]
			) {
				cardColors[1](prev => {
					const updated = [...prev]
					updated[currentRowId[0]][i] = IsKeyValid.PARTLY_VALID
					return updated
				})
				checkedColors.set(
					input[0][i],
					checkedColors.get(input[0][i])! - 1
				)
			}
		}
	}

	//Funkcja obsługująca sprawdzanie wyrazu
	const handleEnterValue = async (): Promise<void> => {
		if (currentRowId[0] < 5 && input[0].length === 5) {
			const guess = input[0].join('')
			if (!allWords.includes(guess)) {
				setShowToast(true)
				setTimeout(() => {
					setShowToast(false)
				}, 1500)
				return
			}

			keyColorMap = keysColors
			setColors()
			input[0].forEach((letter, index) => {
				if (letter === answer[index]) {
					keyColorMap.set(letter, IsKeyValid.VALID)
				}

				if (keysColors.get(letter) !== IsKeyValid.VALID) {
					if (answer.includes(letter)) {
						keyColorMap.set(letter, IsKeyValid.PARTLY_VALID)
					} else {
						keyColorMap.set(letter, IsKeyValid.NOT_VALID)
					}
				}

				setKeyColors(new Map(keyColorMap))
			})

			flipRows[1](prev => {
				const updated = [...prev]
				updated[currentRowId[0]] = true
				return updated
			})

			currentRowId[1](currentRowId[0] + 1)
			input[1]([])
		}
	}

	return (
		<div className='flex flex-col justify-center text-[20px] mt-3 h-[170px] cursor-pointer'>
			{keys.map((arr, index) => (
				<div
					className='flex justify-center h-[30%]'
					key={`row-${index}`}
				>
					{arr.length == 7 && (
						<EnterKey value='ENTER' enterValue={handleEnterValue} />
					)}
					{arr.map((key, letterIndex) => (
						<Key
							key={`key-${letterIndex}`}
							value={key}
							passValue={handlePassValue}
							keyValidation={
								keysColors.get(key) ?? IsKeyValid.UNKNOWN
							}
						/>
					))}
					{arr.length == 7 && (
						<DeleteKey
							value={'DELETE'}
							deleteValue={handleDeleteValue}
						/>
					)}
				</div>
			))}
			<Toast text={invalidWord} show={showToast} />
		</div>
	)
}
