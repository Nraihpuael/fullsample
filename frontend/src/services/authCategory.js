import { axiosClient } from '../lib/axiosClient';


export const getCategoriesData = async (token) => {
  try {
    const res = await axiosClient.get('/category', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('Error getting data from categories:', error);
    throw error;
  }
};

export const createCategory = async (token, categoryData) => {
  try {
    const result = await axiosClient.post('/category/create', categoryData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    console.error('Error creating the category:', error);
    throw error;
  }
};

export const updateCategory = async (token, id, categoryData) => {
  try {
    const result = await axiosClient.put(`/category/${id}`, categoryData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    console.error('Error editing the category:', error);
    throw error;
  }
};

export const deleteCategory = async (token, id) => {
  try {
    const result = await axiosClient.delete(`/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};



