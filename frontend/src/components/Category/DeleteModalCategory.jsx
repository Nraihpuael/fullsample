import React from 'react';
import { toast } from 'sonner';
import { XIcon } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import useCategoryStore from '../../store/categoryStore';
import '../../styles/components/deleteModal.css';

const DeleteModalCategory = ({ onClose, category }) => {
  const { deleteCategory } = useCategoryStore();
  const navigate = useNavigate();

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      toast.success('Category deleted successfully');
      navigate(0); 
      onClose();      
    } catch (error) {
      toast.error(
        `Error deleting category: ${error.message || 'Unknown error'}`
      );
    }
  };
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h2 className='modal-title'>Confirm Delete</h2>
          <Button variant='ghost' size='icon' onClick={onClose} className='close-button' >
            <XIcon />
          </Button>
        </div>
        <p>Are you sure you want to delete this category?</p>
        <div className='modal-buttons'>
          <Button variant='cancel' onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={() => handleDeleteCategory(category.id)}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalCategory;
