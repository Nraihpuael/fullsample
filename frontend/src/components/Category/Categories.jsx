import React, { useState } from 'react';
import '../../styles/components/notes.css';
import { EditIcon, TrashIcon } from '../../assets/icons';
import Button from '../ui/Button';
import DeleteModalCategory from './DeleteModalCategory';
import { Skeleton } from '../ui/Skeleton';

const Categories = ({ categories, onEdit, isLoading }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryDelete, setCategoryToDelete] = useState(null);

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const renderSkeletonRow = () => (
    <div>
      <Skeleton style={{ width: '100%', height: '1.5rem' }} />
      <Skeleton style={{ width: '100%', height: '1.5rem' }} />
      <Skeleton style={{ width: '80px', height: '2rem' }} />
    </div>
  );

  return (
    <div className='notes-container'>
      {isLoading ? (
        <>
          {[...Array(4)].map((_, i) => (
            <div key={i}>{renderSkeletonRow()}</div> // Add a unique key here
          ))}
        </>
      ) : (
        categories?.map((category) => (
          <div key={category.id} className='notes-card' style={{ backgroundColor: category.color }}>
            <div className='notes-card-header'>
              <div className='notes-title' >
                {category.name}
              </div>
            </div>

            <div className='notes-card-footer'>
              <Button variant='outline' size='icon' onClick={() => onEdit(category)}>
                <EditIcon />
              </Button>
              <Button variant='outline' size='icon' onClick={() => handleDeleteClick(category)} >
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))
      )}
      {deleteModalOpen && (
        <DeleteModalCategory onClose={() => setDeleteModalOpen(false)}
          category={categoryDelete}
        />
      )}
    </div>
  );
};

export default Categories;
