import { userAuthenticated, logout } from '../app/authenticationSlice';

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}Authentication`,
});

export const SignIn = async (dispatch, credentials) => {
    const requestUrl = `${axiosInstance.defaults.baseURL}/login`;

    try {
        // API call
        const { data } = await axiosInstance.post('/login', credentials);

        // Assuming your JWT token is returned as data.token, adjust this based on your actual response structure
        const accessToken = data.token;

        // Store the token in localStorage or sessionStorage
        localStorage.setItem('ACCESS_TOKEN', accessToken); // You can use sessionStorage if preferred

        // Dispatch action to update user authentication state
        dispatch(userAuthenticated(data));
    } catch (error) {
        console.error('Error!', error);
    }


}

export const LogOut = async(dispatch, credentials) => {
    try {
        dispatch(logout())
    }
    catch(error){
        console.error('Error!', error);
    }
    
}