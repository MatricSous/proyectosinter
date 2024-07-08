import {
    setExpenses, newProyecto, editExpense, deleteExpense,
    setExpensesError, editExpenseError, newProyectoError, deleteExpenseError
} from '../app/expenseSlice';
import axios from 'axios';

const axiosInstance = axios.create({    
    baseURL: `${process.env.REACT_APP_BASE_URL}ProyectosArqui`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const GetExpenses = async (dispatch) => {
    try {
        // api call
        const { data } = await axiosInstance.get();
        dispatch(setExpenses(data));
    } catch {
        dispatch(setExpensesError());
    }
}

export const crearProyecto = async (dispatch, proyecto) => {
    try {
        // api call
        const { data } = await axiosInstance.post('', proyecto);
        dispatch(newProyecto(data));
    } catch {
        dispatch(newProyectoError());
    }
}

export const EditExpense = async (dispatch, expense) => {
    try {
        // api call
        await axiosInstance.put('', expense);
        dispatch(editExpense(expense));
    } catch {
        dispatch(editExpenseError());
    }
}

export const DeleteExpense = async (dispatch, expense) => {
    try {
        // api call
        await axiosInstance.delete('', { data: { ...expense } });
        dispatch(deleteExpense(expense));
    } catch {
        dispatch(deleteExpenseError());
    }
}