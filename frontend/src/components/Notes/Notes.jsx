import React, { useState } from 'react';
import { EditIcon, PaperclipIcon, TrashIcon } from '../../assets/icons';
import { Skeleton } from '../ui/Skeleton';
import Button from '../ui/Button';
import DeleteModalnNotes from './DeleteModalnNotes';
import useNoteStore from '../../store/noteStore';
import '../../styles/components/notes.css';


const Notes = ({ notes, onEdit, isLoading }) => {
  
  const { toggleArchiveNote } = useNoteStore();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteDelete, setNoteToDelete] = useState(null);

  const handleDeleteClick = (note) => {
    setNoteToDelete(note);
    setDeleteModalOpen(true);
  };

  const renderSkeletonRow = () => (
    <div >
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
            <div key={i}>{renderSkeletonRow()}</div>
          ))}
        </>
      ) : (
        notes?.map((note) => (
          <div key={note.id} className='notes-card' style={{ backgroundColor: note.color }}>
            <div className='notes-card-header'>
              <a href={`/note/${note.id}`} className='notes-title'>
                {note.title}
              </a>
            </div>
            <div className='notes-card-body'>
              <div className='notes-categories'>
                {note.categories && note.categories.length > 0 ? (
                  note.categories.map((category, index) => (
                    <span key={index} className='notes-category' style={{ backgroundColor: category.color }}>
                      {category.name}
                    </span>
                  ))
                ) : (
                  <span className='notes-category' style={{ color: 'black' }}>
                    No categories
                  </span>

                )}
              </div>
            </div>
            <div className='notes-card-footer'>
              <Button variant='outline' size='icon' onClick={() => onEdit(note)} >
                <EditIcon />
              </Button>
              <Button variant='outline' size='icon' onClick={() => toggleArchiveNote(note.id)}>
                <PaperclipIcon />
              </Button>
              <Button variant='outline' size='icon' onClick={() => handleDeleteClick(note)} >
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))
      )}
      {deleteModalOpen && (
        <DeleteModalnNotes onClose={() => setDeleteModalOpen(false)}
          note={noteDelete}
          isInList={true}
        />
      )}
    </div>
  );
};

export default Notes;
