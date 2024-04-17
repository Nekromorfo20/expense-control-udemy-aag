import { v4 as uuidv4 } from "uuid"
import type { TCategory, TDraftExpense, TExpense } from "../types"

export type TBudgetActions =
    { type: "add-budget", payload: { budget : number } } |
    { type: "show-modal" } |
    { type: "close-modal" } |
    { type: "add-expense", payload: { expense : TDraftExpense } } |
    { type: "remove-expense", payload: { id : TExpense["id"] } } |
    { type: "get-expense-by-id", payload: { id : TExpense["id"] } } |
    { type: "update-expense", payload: { expense : TExpense } } |
    { type: "reset-app" } |
    { type: "add-filter-category", payload: { id : TCategory["id"] } }

export type TBudgetState = {
    budget : number
    modal : boolean
    expenses : TExpense[]
    editingId : TExpense["id"]
    currentCategory : TCategory["id"]
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem("budget")
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = () : TExpense[] => {
    const localStorageExpenses = localStorage.getItem("expenses")
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState : TBudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: "",
    currentCategory: ""
}

const createExpense = (draftExpense : TDraftExpense) : TExpense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state : TBudgetState,
    action : TBudgetActions
) => {

    if (action.type === "add-budget") {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === "show-modal") {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === "close-modal") {
        return {
            ...state,
            modal: false,
            editingId: ""
        }
    }

    if (action.type === "add-expense") {
        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if (action.type === "remove-expense") {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    if (action.type === "get-expense-by-id") {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === "update-expense") { 
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingId: ""
        }
    }

    if (action.type === "reset-app") { 
        return {
            ...state,
            budget: 0,
            expenses: [],
        }
    }

    if (action.type === "add-filter-category") { 
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state
}