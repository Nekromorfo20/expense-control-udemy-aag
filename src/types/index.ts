type TValuePiece = Date | null

export type TValue = TValuePiece | [TValuePiece, TValuePiece]

export type TExpense = {
    id : string
    expenseName : string
    amount : number
    category : string
    date : TValue
}

export type TDraftExpense = Omit<TExpense, 'id'>

export type TCategory = {
    id : string
    name : string
    icon : string
}