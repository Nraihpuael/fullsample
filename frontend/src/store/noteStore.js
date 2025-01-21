import { create } from 'zustand';
import {
    getNote, getNoteData, getNoteArchivedData,
    createNote, updateNote, toggleArchiveNote, deleteNote
} from '../services/authNotes';
import { toast } from 'sonner';
import useAuthStore from './authStore';

const useNoteStore = create((set, get) => {
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
        note: null,
        notesData: null,
        notesArchivedData: null,
        isLoading: false,
        error: null,

        fetchNote: async (id) => {
            const { token } = useAuthStore.getState();
            if (!token) {
                set({ error: 'Authentication token not found' });
                return;
            }
            const data = await handleApiCall(
                () => getNote(token, id),
                'Error getting data from note'
            );
            if (data) set({ note: data });
        },

        fetchNoteData: async () => {
            const { token } = useAuthStore.getState();
            console.log(token);
            if (!token) {
                set({ error: 'Authentication token not found' });
                return;
            }
            const data = await handleApiCall(
                () => getNoteData(token),
                'Error getting data from notes'
            );
            if (data) set({ notesData: data });
        },

        fetchNoteArchivedData: async () => {
            const { token } = useAuthStore.getState();
            console.log(token);
            if (!token) {
                set({ error: 'Authentication token not found' });
                return;
            }
            const data = await handleApiCall(
                () => getNoteArchivedData(token),
                'Error getting data from notes'
            );
            if (data) set({ notesArchivedData: data });
        },

        createNote: async (noteData) => {
            const { token } = useAuthStore.getState();
            if (!token) {
                set({ error: 'Authentication token not found' });
                return;
            }
            await handleApiCall(
                () => createNote(token, noteData),
                'Error creating the note'
            );
        },

        updateNote: async (id, noteData) => {
            const { token } = useAuthStore.getState();
            if (!token) {
                set({ error: 'Authentication token not found' });
                return;
            }
            await handleApiCall(
                () => updateNote(token, id, noteData),
                'Error updating the note'
            );
        },

        toggleArchiveNote: async (id) => {
            const { token } = useAuthStore.getState();
            if (!token) {
                set({ error: 'Authentication token not found' });
                return;
            }
            await handleApiCall(
                () => {
                    toggleArchiveNote(token, id);
                    toast.success('Note archived/unarchived successfully!');
                    window.location.reload();
                },
                'Error archiving the note'
            );
        },

        deleteNote: async (id) => {
            const { token } = useAuthStore.getState();
            if (!token) {
                set({ error: 'Authentication token not found' });
                return;
            }
            await handleApiCall(
                () => deleteNote(token, id),
                'Error deleting category'
            );
        },

        clearError: () => set({ error: null }),

    };
});

export default useNoteStore;