
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
    let keyStyle = "p-1 m-1 cursor-pointer text-[90%] w-[8%] aspect-square"
    if(keyValidation == IsKeyValid.VALID){
        keyStyle = keyStyle.concat(" bg-green-600")
    }
    else if(keyValidation == IsKeyValid.PARTLY_VALID){
        keyStyle = keyStyle.concat(" bg-orange-500")
    }
    else if(keyValidation == IsKeyValid.NOT_VALID){
        keyStyle = keyStyle.concat(" bg-gray-700")
    }
    else{
        keyStyle = keyStyle.concat(" bg-gray-500")
    }

    return(
         <div className={keyStyle} onClick={() => passValue(value)}>{value}</div>
    )
  
}

interface DeleteKeyProps{
    value: string,
    deleteValue: () => void
}

export function DeleteKey({value, deleteValue}: DeleteKeyProps){
    return(
        <div className="p-2 cursor-pointer" onClick={() => deleteValue()}>{value}</div>
    )
}

interface EnterValueProps{
    value: string,
    enterValue: () => void
}

export function EnterKey({value, enterValue}: EnterValueProps){
    return(
        <div className="p-2 cursor-pointer" onClick={() => enterValue()}>{value}</div>
    )
}