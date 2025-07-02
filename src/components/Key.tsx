
interface KeyProps{
    value: string,
    passValue: (val: string)=>void
}

export function Key({value, passValue}: KeyProps){

    return(
         <div className="p-2 cursor-pointer" onClick={() => passValue(value)}>{value}</div>
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