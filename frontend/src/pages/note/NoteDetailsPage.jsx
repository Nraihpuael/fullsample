import { memo, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditIcon, TrashIcon, ArrowLeftIcon, PaperclipIcon } from '../../assets/icons';
import Button from '../../components/ui/Button';
import DeleteModalnNotes from '../../components/Notes/DeleteModalnNotes';
import useNoteStore from '../../store/noteStore';
import '../../styles/pages/detailsPage.css';


export default function NoteDetailsPage() {
  const { id } = useParams();
  const { fetchNote, note, toggleArchiveNote, isLoading } = useNoteStore();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteDelete, setNoteToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNote(id);
  }, [fetchNote, id]);

  const handleDeleteClick = (note) => {
    setNoteToDelete(note);
    setDeleteModalOpen(true);
  };

  const handleEditNote = useCallback((note) => {
    navigate('/note', { state: { note } });
  }, [navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <div>Note not found.</div>;
  }

  return (
    <>
      <main className='note-detail-container' style={{ marginTop: '5rem' }}>
        <div className='note-header'>
          <h1 className='note-title'>{note.title}</h1>
          <Button variant='ghost' size='icon' onClick={handleBackClick}  >
            <ArrowLeftIcon />
          </Button>
        </div>
        <div className='note-content'>{note.content}</div>
        <div className='note-categories'>
          {note.categories && note.categories.length > 0 ? (
            note.categories.map((category, index) => (
              <span key={index} className='note-category' style={{ backgroundColor: category.color }}>
                {category.name}
              </span>
            ))
          ) : (
            <span className='note-category'>Uncategorized</span>
          )}
        </div>
        <div className='note-actions'>
          <Button variant='outline' onClick={() => handleEditNote(note)}>
            <EditIcon />
          </Button>
          <Button variant='outline' onClick={() => toggleArchiveNote(note.id)}>
            <PaperclipIcon />
          </Button>
          <Button variant='outline' size='icon' onClick={() => handleDeleteClick(note)}>
            <TrashIcon />
          </Button>
        </div>
      </main>
      {deleteModalOpen && (
        <DeleteModalnNotes onClose={() => setDeleteModalOpen(false)}
          note={noteDelete}
          isInList={false}
        />
      )}
    </>
  );
}