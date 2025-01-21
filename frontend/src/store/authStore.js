import { create } from 'zustand';
import Cookies from 'js-cookie';
import {
  loginUser,
  registerUser,
  logout,
} from '../services/authUser';


const useAuthStore = create((set, get) => {
  const handleApiCall = async (apiCall, errorMessage) => {
    set({ isLoading: true, error: null });
    try {
      const result = await apiCall();
      set({ isLoading: false });
      return result;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || errorMessage;
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  };

  const setToken = (token) => {
    Cookies.set('authToken', token, { expires: 7 });
    set({ token });
  };

  return {
    token: Cookies.get('authToken') || null,
    isLoading: false,
    error: null,
    user: null,

    login: async (email, password) => {
      const res = await handleApiCall(
        () => loginUser({ email, password }),
        'Error in logging'
      );
      const token = res.token || res;
      setToken(token);
      return token;
    },

    register: async (userData) => {
      await handleApiCall(
        () => registerUser(userData),
        'Error registering user'
      );
      return get().login(userData.email, userData.password);
    },

    logout: async () => {
      const token2 = Cookies.get('authToken');
      Cookies.remove('authToken');
      set({ token: null, user: null});
      await handleApiCall(
        () => logout(token2),
      );
    },


    clearError: () => set({ error: null }),

    isAuthenticated: () => !!get().token,
  };
});

export default useAuthStore;
