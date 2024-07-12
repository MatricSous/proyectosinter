import { createSlice, createAction } from '@reduxjs/toolkit';

export const setExpensesError = createAction('setExpensesError');
export const newProyectoError = createAction('newExpenseError');
export const editExpenseError = createAction('editExpenseError');
export const deleteExpenseError = createAction('deleteExpenseError');



export const expensesSlice = createSlice({
    name: 'proyectos',
    initialState: {
        proyectosArray: [],
        detallesProyecto: []
    },
    reducers: {
        newProyecto: (state, action) => {
            const { titulo, foto, ...rest } = action.payload;
            const newExpense = { titulo, foto, ...rest };
            return { ...state, expenses: [newExpense, ...state.expenses] };
        },

          setProyectoUsuario: (state, action) => {
            console.log("set");
            console.log('Payload:', action.payload);
            const updatedProyectosArray = action.payload;
            console.log('Updated proyectosArray:', updatedProyectosArray);
            return {
                ...state,
                proyectosArray: updatedProyectosArray,
            };

            
        },

        newComentario: (state, action) => {
            console.log(action.payload)
            const { idProyecto, contenido, ...rest } = action.payload;
            const newExpense = { idProyecto, contenido, ...rest };
            return { ...state, expenses: [newExpense, ...state.expenses] };
        },
        setDetallesProyecto: (state, action) => {
            console.log("set Detalles");
            console.log('Payload:', action.payload);
            const updatedDetallesProyecto = action.payload;
            console.log('Updated detallesProyecto:', updatedDetallesProyecto);
            return {
                ...state,
                detallesProyecto: updatedDetallesProyecto,
            };

            
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

export const {newProyecto, newComentario, setDetallesProyecto, setProyectoUsuario, editExpense, deleteExpense } = expensesSlice.actions;

export default expensesSlice.reducer;