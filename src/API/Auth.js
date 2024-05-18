import axios from 'axios';

const baseURL = 'https://webalar-backend-6wp3.onrender.com/auth'; 

// Register a new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/signup`, userData);
    
    return response.data;
  } catch (error) {
    
    return error
  }
};

// Login user
export const login = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/login`, userData);  
    return response.data;
  } catch (error) {
   
    return error
  }
};
