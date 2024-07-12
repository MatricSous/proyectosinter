import {editProyecto,
    setExpenses, setDetalleReferencia, setProyectoUsuarioUser, newColaborador, deleteReferencia, newReferencia, newArchivo, setProyectoUsuario, setDetallesProyecto, newComentario, newProyecto, editExpense, deleteExpense,
    setExpensesError, editExpenseError, newProyectoError, deleteExpenseError
} from '../app/expenseSlice';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const axiosInstance = axios.create({    
    baseURL: `${process.env.REACT_APP_BASE_URL}ProyectosArqui`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const GetProyectos = async (dispatch) => {
    try {
        // api call
        const { data } = await axiosInstance.get('');
        dispatch(setProyectoUsuario(data));
        console.log(data)
    } catch {
        dispatch(setExpensesError());
    }
}


export const GetProyectosUsuario = async (dispatch) => {
    try {
        // api call
        const { data } = await axiosInstance.get('/ProyectosUsuario');
        dispatch(setProyectoUsuarioUser(data));
        console.log(data)
    } catch {
        dispatch(setExpensesError());
    }
}


export const GetDetallesReferencia= async (dispatch, dataIn) => {
    try {
        // api call

        const { data } = await axiosInstance.post('/GetDetalleReferencia', dataIn);
        dispatch(setDetalleReferencia(data));
        console.log(data)
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

export const crearArchivo= async (dispatch, proyecto) => {
    try {
        // api call
        console.log(proyecto)
        const { data } = await axiosInstance.post('crearArchivo', proyecto);
        dispatch(newReferencia(data));
    } catch {
        dispatch(newProyectoError());
    }
}


export const crearReferencia = async (dispatch, proyecto) => {
    try {
        // api call
        console.log(proyecto)
        const { data } = await axiosInstance.post('crearReferencia', proyecto);
        dispatch(newArchivo(data));
    } catch {
        dispatch(newProyectoError());
    }
}



export const editarProyecto = async (dispatch, proyecto) => {
    try {
        // api call
        const { data } = await axiosInstance.put('', proyecto);
        dispatch(editProyecto(data));
    } catch {
        dispatch(newProyectoError());
    }
}

export const comentar = async (dispatch, comentario) => {
    try {
        // api call
        console.log(comentario)
        const { data } = await axiosInstance.post('/comentar', comentario);
        dispatch(newComentario(data));
    } catch {
        dispatch(newProyectoError());
    }
}

export const añadirColaborador = async (dispatch, member) => {
    try {
        // api call
        console.log(member)
        const { data } = await axiosInstance.post('/añadirColaborador', member);
        dispatch(newColaborador(data));
    } catch {
        dispatch(newProyectoError());
    }
}

export const GetDetallesProyecto = async (dispatch, id) => {
    try {
        // api call
        const { data } = await axiosInstance.post('/datosProyecto', id );
        dispatch(setDetallesProyecto(data));
        console.log(data)
    } catch {
        dispatch(setExpensesError());
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

export const eliminarReferencia = async (dispatch, expense) => {
    try {
        // api call
        console.log(expense)
        await axiosInstance.delete('eliminarReferencia', { data: { ...expense }});
        dispatch(deleteReferencia(expense));
    } catch {
        dispatch(deleteExpenseError());
    }
}


export const eliminarArchivo = async (dispatch, expense) => {
    try {
        // api call
        console.log(expense)
        await axiosInstance.delete('eliminarArchivo', { data: { ...expense }});
        dispatch(deleteReferencia(expense));
    } catch {
        dispatch(deleteExpenseError());
    }
}

export const eliminarColaborador = async (dispatch, expense) => {
    try {
        // api call
        console.log(expense)
        await axiosInstance.delete('eliminarColaborador', { data: { ...expense }});
        dispatch(deleteReferencia(expense));
    } catch {
        dispatch(deleteExpenseError());
    }
}



export const eliminarProyecto = async (dispatch, expense) => {
    try {
        // api call
        await axiosInstance.delete('', { data: { ...expense } });
        dispatch(deleteExpense(expense));
    } catch {
        dispatch(deleteExpenseError());
    }
}