import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVisibleCategories, useSelectedCategories, useFilteredNotes } from '../../hooks/useCategories';
import { PlusIcon } from '../../assets/icons';
import Button from '../../components/ui/Button';
import CategoryFilter from '../../components/Category/CategoryFilter';
import Notes from '../../components/Notes/Notes';
import useNoteStore from '../../store/noteStore';
import '../../styles/pages/myDataPage.css';

export default function MyNotesPage() {
  const { fetchNoteData, notesData, isLoading } = useNoteStore();
  const { selectedCategories, addCategory, removeCategory } = useSelectedCategories();
  const filteredNotes = useFilteredNotes(notesData, selectedCategories);
  const navigate = useNavigate();
  const MemoizedNotes = memo(Notes);
  const visibleCategories = useVisibleCategories(notesData);

  useEffect(() => {
    fetchNoteData();
  }, [fetchNoteData]);

  const handleNavigateNote = () => {
    navigate('/note');
  };

  const handleEditNote = useCallback(
    (note) => {
      navigate('/note', { state: { note } });
    },
    [navigate]
  );

  return (
    <>
      <main className='data-container' style={{ marginTop: '5rem' }}>
        <div>
          <div className='header-container'>
            <h1 className='primary-title2'>My Notes</h1>
            <div className='button-container'>
              <Button leftIcon={<PlusIcon />} onClick={handleNavigateNote}>
                New Note
              </Button>
            </div>
          </div>
          <CategoryFilter
            visibleCategories={visibleCategories}
            selectedCategories={selectedCategories}
            onAddCategory={addCategory}
            onRemoveCategory={removeCategory}
          />
          <div>
            <MemoizedNotes
              notes={filteredNotes}
              onEdit={handleEditNote}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </>
  );
}
