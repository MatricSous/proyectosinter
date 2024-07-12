import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';


export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        token: '',
        isLoggedIn: false,
        rol: ''
    },
    reducers: {
        userAuthenticated: (state, action) => {
            sessionStorage.setItem('token', action.payload.token);
            const decodedToken = jwtDecode(action.payload.token)
            console.log("wenapo")
            console.log(decodedToken.role)
            return {
                ...state, ...{
                    accessToken: action.payload.token,
                    isLoggedIn: true,
                    rol: decodedToken.role


                }
            }
        },
        logout: (state, action) => {
            console.log("logout master")
            sessionStorage.clear();
            localStorage.clear();
            return {
                ...state, ...{
                    accessToken: '',
                    isLoggedIn: false,
                    rol: ''


                }
            }
        }
    }
});

export const { userAuthenticated, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;