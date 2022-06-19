import axios from "axios";

const URL = process.env.REACT_APP_URL || 'http://localhost:5000/api';

//Register user
const register = async (userData) => {
  const response = await axios.post(`${URL}/register`, userData);

  if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
}

//Login user
const login = async (userData) => {
  const response = await axios.post(`${URL}/login`, userData);

  if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
}

const logout = () => {
  localStorage.removeItem('user');
}

const authService = {
  register,
  login,
  logout,
}


export  default authService;