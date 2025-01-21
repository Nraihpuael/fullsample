import { create } from 'zustand';
import { getCategoriesData, createCategory, updateCategory, deleteCategory } from '../services/authCategory';
import useAuthStore from './authStore';

const useCategoryStore = create((set, get) => {
  const handleApiCall = async (apiCall, errorMessage) => {
    set({ isLoading: true, error: null });
    try {
      const result = await apiCall();
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({ error: error.message || errorMessage, isLoading: false });
      throw error;
    }
  };

  return {
    CategoriesData: null,
    isLoading: false,
    error: null,

    fetchCategoryData: async () => {
      const { token } = useAuthStore.getState();
      if (!token) {
        set({ error: 'Authentication token not found' });
        return;
      }
      const data = await handleApiCall(
        () => getCategoriesData(token),
        'Error getting data from notes'
      );
      if (data) set({ CategoriesData: data });
    },

    createCategory: async (categoryData) => {
      const { token } = useAuthStore.getState();
      if (!token) {
        set({ error: 'Authentication token not found' });
        return;
      }
      const newCategory = await handleApiCall(
        () => createCategory(token, categoryData),
        'Error creating category'
      );
      return newCategory;
    },

    updateCategory: async (id, categoryData) => {
      const { token } = useAuthStore.getState();
      if (!token) {
        set({ error: 'Authentication token not found' });
        return;
      }
      await handleApiCall(
        () => updateCategory(token, id, categoryData),
        'Error updating category'
      );
    },

    deleteCategory: async (id) => {
      const { token } = useAuthStore.getState();
      if (!token) {
        set({ error: 'Authentication token not found' });
        return;
      }
      await handleApiCall(
        () => deleteCategory(token, id),
        'Error deleting category'
      );
    },

    clearError: () => set({ error: null }),
    
  };
});

export default useCategoryStore;
