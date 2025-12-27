export const IsKeyValid = {
  UNKNOWN: 'unknown',
  PARTLY_VALID: 'partly_valid',
  VALID: 'valid',
  NOT_VALID: 'not_valid',
} as const

export type IsKeyValid = (typeof IsKeyValid)[keyof typeof IsKeyValid]
interface KeyProps {
  value: string
  passValue: (val: string) => void
  keyValidation: IsKeyValid
}

export function Key({ value, passValue, keyValidation }: KeyProps) {
  const baseStyle =
	'flex-1 min-w-[40px] h-12 sm:h-auto m-0.5 sm:m-1 cursor-pointer text-sm sm:text-[90%] w-auto sm:w-[8%] aspect-square sm:aspect-square rounded-sm font-bold shadow-sm flex items-center justify-center '
  const keyStyle = `${baseStyle} ${
    keyValidation === IsKeyValid.VALID
      ? 'bg-[#A1D6B2]'
      : keyValidation === IsKeyValid.PARTLY_VALID
      ? 'bg-[#F0A04B]'
      : keyValidation === IsKeyValid.NOT_VALID
      ? 'bg-[#9FB3DF] opacity-50'
      : 'bg-[#9FB3DF]'
  }`

  return (
    <div className={keyStyle} onClick={() => passValue(value)}>
      {value.toUpperCase()}
    </div>
  )
}

interface DeleteKeyProps {
  value: string
  deleteValue: () => void
}

export function DeleteKey({ value, deleteValue }: DeleteKeyProps) {
  return (
    <div
    className='flex-[1.5] sm:flex-none min-w-[60px] h-12 sm:h-auto p-1 m-0.5 sm:m-1 cursor-pointer bg-[#9FB3DF] text-xs sm:text-[90%] w-auto sm:w-[20%] rounded-sm font-bold shadow-sm flex items-center justify-center'
      onClick={() => deleteValue()}
    >
      {value}
    </div>
  )
}

interface EnterValueProps {
  value: string
  enterValue: () => void
}

export function EnterKey({ value, enterValue }: EnterValueProps) {
  return (
    <div
    className='flex-[1.5] sm:flex-none min-w-[60px] h-12 sm:h-auto p-1 m-0.5 sm:m-1 cursor-pointer bg-[#9FB3DF] text-xs sm:text-[90%] w-auto sm:w-[20%] rounded-sm font-bold shadow-sm flex items-center justify-center'
      onClick={() => enterValue()}
    >
      {value}
    </div>
  )
}
