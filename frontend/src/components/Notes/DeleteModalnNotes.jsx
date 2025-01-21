import React from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { XIcon } from '../../assets/icons';
import Button from '../ui/Button';
import useNoteStore from '../../store/noteStore';
import '../../styles/components/deleteModal.css';


const DeleteModalnNotes = ({ onClose, note,isInList }) => {
  const { deleteNote } = useNoteStore();
  const navigate = useNavigate();

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      toast.success('Note deleted successfully');
      onClose();
      if(isInList){
        navigate(0); 
      }else{
        navigate('/notes');
      }
     
    } catch (error) {
      toast.error(
        `Error deleting note: ${error.message || 'Unknown error'}`
      );
    }
  };
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h2 className='modal-title'>Confirm Delete</h2>
          <Button variant='ghost' size='icon' onClick={onClose}>
            <XIcon />
          </Button>
        </div>
        <p>Are you sure you want to delete this note?</p>
        <div className='modal-buttons'>
          <Button variant='cancel' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => handleDeleteNote(note.id)}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalnNotes;
