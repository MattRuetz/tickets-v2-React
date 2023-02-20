import axios from 'axios';

// This file is used to pull user from API (connected to Mongo DB)

const API_URL = 'api/users';

const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        // localStorage can only take strings
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);

    if (response.data) {
        // localStorage can only take strings
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Logout user
const logout = () => localStorage.removeItem('user');

const authService = {
    register,
    login,
    logout,
};

export default authService;
