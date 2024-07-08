import { createSlice, createAction } from '@reduxjs/toolkit';

export const setExpensesError = createAction('setExpensesError');
export const newProyectoError = createAction('newExpenseError');
export const editExpenseError = createAction('editExpenseError');
export const deleteExpenseError = createAction('deleteExpenseError');

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        expenses: [],
    },
    reducers: {
        setExpenses: (state, action) => {
            return { ...state, expenses: [...action.payload] };
        },
        newProyecto: (state, action) => {
            const { titulo, foto, ...rest } = action.payload;
            const newExpense = { titulo, foto, ...rest };
            return { ...state, expenses: [newExpense, ...state.expenses] };
          },
          
        editExpense: (state, action) => {
            const expenses = state.expenses.map(expense => {
                if (expense.id === action.payload.id) {
                    expense = action.payload;
                }
                return expense;
            });
            return { ...state, expenses: [...expenses] };
        },
        deleteExpense: (state, action) => {
            const expenses = state.expenses.filter(expense =>
                expense.id !== action.payload.id);
            return { ...state, expenses: [...expenses] };
        }
    }
});

export const { setExpenses, newProyecto, editExpense, deleteExpense } = expensesSlice.actions;

export default expensesSlice.reducer;