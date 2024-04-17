import { formatCurrency } from "../helpers"

type TAmountDisplayProps = {
    label? : string
    amount : number
}

const AmountDisplay = ({ label, amount } : TAmountDisplayProps) => {
  return (
    <div>
       <p className="text-2xl text-blue-600 font-bold">
            { label && `${label}: `}
           <span className="font-black text-black">{formatCurrency(amount)}</span>
       </p>
    </div>
  )
}

export default AmountDisplay