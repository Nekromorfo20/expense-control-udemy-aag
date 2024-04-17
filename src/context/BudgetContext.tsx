import { useMemo, useReducer, createContext, Dispatch, ReactNode } from "react"
import { TBudgetActions, TBudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

type TBudgetContextProps = {
    state : TBudgetState
    dispatch : Dispatch<TBudgetActions>
    totalExpenses : number
    remainingBudget : number
}

type TBudgetProviderProps = {
    children : ReactNode
}

export const BudgetContext = createContext<TBudgetContextProps>(null!)

export const BudgetProvider = ({ children } : TBudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    // Calculo de Gastos totales y Gasto restante
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
    const remainingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}