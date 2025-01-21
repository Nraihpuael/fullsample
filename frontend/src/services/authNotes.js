import { axiosClient } from '../lib/axiosClient';


export const getNote = async (token, id) => {
  try {
    const res = await axiosClient.get(`/note/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log(`Error al obtener el libro con id ${id}`, error);
    throw error;
  }
};


export const getNoteData = async (token) => {
  try {
    const res = await axiosClient.get('/note', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('Error getting data from notes:', error);
    throw error;
  }
};

export const getNoteArchivedData = async (token) => {
  try {
    const res = await axiosClient.get('/note/archived', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('Error getting data from notes:', error);
    throw error;
  }
};


export const createNote = async (token, noteData) => {
  try {
    const result = await axiosClient.post('/note/create', noteData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    console.error('Error creating the note:', error);
    throw error;
  }
};

export const updateNote = async (token, id, noteData) => {
  try {
    const result = await axiosClient.put(`/note/${id}`, noteData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    console.error('Error editing the note:', error);
    throw error;
  }
};

export const toggleArchiveNote = async (token, id) => {
  try {
    const result = await axiosClient.put(`/note/archive/${id}`,{}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    console.error('Error editing the note:', error);
    throw error;
  }
};

export const deleteNote = async (token, id) => {
  try {
    const result = await axiosClient.delete(`/note/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

