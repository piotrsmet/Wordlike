
export const IsKeyValid = {
    UNKNOWN: "unknown",
    PARTLY_VALID: "partly_valid",
    VALID: "valid",
    NOT_VALID: "not_valid"
} as const;

export type IsKeyValid = (typeof IsKeyValid)[keyof typeof IsKeyValid]
interface KeyProps{
    value: string,
    passValue: (val: string)=>void,
    keyValidation: IsKeyValid
}


export function Key({value, passValue, keyValidation}: KeyProps){
    const baseStyle = "p-1 m-1 cursor-pointer text-[90%] w-[8%] aspect-square";
    const keyStyle = `${baseStyle} ${
        keyValidation === IsKeyValid.VALID
        ? "bg-green-600"
        : keyValidation === IsKeyValid.PARTLY_VALID
        ? "bg-orange-500"
        : keyValidation === IsKeyValid.NOT_VALID
        ? "bg-gray-700"
        : "bg-gray-500"
    }`;

    return(
         <div className={keyStyle} onClick={() => passValue(value)}>{value.toUpperCase()}</div>
    )
  
}

interface DeleteKeyProps{
    value: string,
    deleteValue: () => void
}

export function DeleteKey({value, deleteValue}: DeleteKeyProps){
    return(
        <div className="p-1 m-1 cursor-pointer bg-gray-500 text-[90%] w-[20%]" onClick={() => deleteValue()}>{value}</div>
    )
}

interface EnterValueProps{
    value: string,
    enterValue: () => void
}

export function EnterKey({value, enterValue}: EnterValueProps){
    return(
        <div className="p-1 m-1 cursor-pointer bg-gray-500 text-[90%] w-[20%]" onClick={() => enterValue()}>{value}</div>
    )
}