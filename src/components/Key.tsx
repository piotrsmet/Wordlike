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
    'p-1 m-1 cursor-pointer text-[90%] w-[8%] aspect-square rounded-sm font-bold shadow-sm '
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
      className='p-1 m-1 cursor-pointer bg-[#9FB3DF] text-[90%] w-[20%] rounded-sm font-bold shadow-sm'
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
      className='p-1 m-1 cursor-pointer bg-[#9FB3DF] text-[90%] w-[20%] rounded-sm font-bold shadow-sm'
      onClick={() => enterValue()}
    >
      {value}
    </div>
  )
}
