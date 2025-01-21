import { axiosClient } from '../lib/axiosClient';

export const registerUser = async (userData) => {
  try {
    const res = await axiosClient.post('/auth/register', userData);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error registering user');
    }
    throw new Error('Error registering user');
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await axiosClient.post('/auth/login', userData);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error in logging');
    }
    throw new Error('Error in logging');
  }
};

export const logout = async (token) => {
  try {
    console.log(token);
    const res = await axiosClient.post('/auth/logout', null, {
      headers: { Authorization: `Bearer ${token}` }, 
    });
    return res.data;
  } catch (error) {    
    throw error;
  } 
};