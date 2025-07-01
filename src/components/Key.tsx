
interface KeyProps{
    value: string,
    passValue: (val: string)=>void
}

export default function Key({value, passValue}: KeyProps){

    return(
        <div className="p-2 cursor-pointer" onClick={() => passValue(value)}>{value}</div>
    )
}