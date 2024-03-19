// authService.js
import axios from 'axios';

const API_URL = 'https://abanchiqschoolapi.onrender.com/api/auth/adminstration/shop/';
const API_URL_VERIFY = 'https://abanchiqschoolapi.onrender.com/api/auth/adminstration/shop/verify/';
const API_URL_RESET = 'https://abanchiqschoolapi.onrender.com/api/auth/adminstration/shop/config/resetbymail';
const API_URL_RESET_PASSWORD = 'https://abanchiqschoolapi.onrender.com/api/auth/adminstration/shop/config/resetpassword';

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Verify user
const verifyUser = async (token) => {
    const response = await axios.get(`${API_URL_VERIFY}${token}`);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Reset user
const resetUser = async (resetData) => {
    const response = await axios.post(API_URL_RESET, resetData);
    return response.data;
};
// Reset Password
const resetUserPassword = async (resetPasswordInfo) => {
    const response = await axios.post(API_URL_RESET_PASSWORD, resetPasswordInfo);
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = async () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    verifyUser,
    resetUser,
    resetUserPassword,
    login,
    logout,
};

export default authService;
