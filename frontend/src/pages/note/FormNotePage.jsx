import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { noteSchema } from '../../validations/noteSchema';
import { PlusIcon } from '../../assets/icons';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../components/ui/Button';
import FormModalCategory from '../../components/Category/FormModalCategory';
import Input from '../../components/ui/Input';
import InputColor from '../../components/ui/InputColor';
import Textarea from '../../components/ui/TextArea';
import useCategoryStore from '../../store/categoryStore';
import useNoteStore from '../../store/noteStore';
import '../../styles/pages/notePage.css';


export default function FormNotePage() {
  const { state } = useLocation();
  const note = state?.note;
  const { fetchCategoryData, CategoriesData, isLoading } = useCategoryStore();
  const { createNote, updateNote, error, clearError } = useNoteStore();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [openFormModal, setOpenFormModal] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    setValue,
  } = useForm({ resolver: zodResolver(noteSchema) });

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  useEffect(() => {
    if (note) {
      setValue('title', note.title);
      setValue('content', note.content);
      setValue('color', note.color);
      if (note.categories) {
        setSelectedCategories(note.categories);
      }
    }
  }, [note, setValue]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleOpenNewCategoryModal = useCallback(() => {
    setOpenFormModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenFormModal(false);
  }, []);

  useEffect(() => {
    if (CategoriesData) {
      setAllCategories(CategoriesData);
    }
  }, [CategoriesData]);

  const handleAddCategory = (category) => {
    if (!selectedCategories.some((cat) => cat.id === category.id)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRemoveCategory = (categoryId) => {
    setSelectedCategories(
      selectedCategories.filter((cat) => cat.id !== categoryId)
    );
  };

  const onSubmit = async (data) => {
    const categoryIds = selectedCategories.map((category) => category.id);

    const newNote = {
      ...data,
      categoryIds: categoryIds,
    };
    console.log(newNote);
    try {
      if (note) {
        await updateNote(note.id, newNote);
        toast.success('Note successfully updated');
      } else {
        await createNote(newNote);
        toast.success('Note successfully created');
      }
      navigate('/notes');
    } catch (error) {
      toast.error(
        `An error occurred while carrying out: ${error.message || 'Unknown error'}`
      );
      console.error(error);
      clearError();
    }
    setSelectedCategories([]);
  };

  const handleInputChange = async (field) => {
    await trigger(field);
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }
  return (
    <>
      <main className='create-note-container'>
        <form onSubmit={handleSubmit(onSubmit)} className='note-form'>
          <section className='note-info-section'>
            <div className='form-header'>
              <h1 className='form-title'>{note ? 'Edit Note' : 'New Note'}</h1>
            </div>
            <div className='form-group'>
              <Input
                label='Title'
                type='text'
                name='title'
                placeholder='Title of the note'
                {...register('title')}
                onBlur={() => handleInputChange('title')}
                isError={!!errors.title}
                errorMessage={errors.title?.message}
                required
                className='form-input'
              />
            </div>
            <div className='form-group'>
              <Textarea
                label='Content'
                name='content'
                placeholder='Content of the note'
                {...register('content')}
                onBlur={() => handleInputChange('content')}
                isError={!!errors.content}
                errorMessage={errors.content?.message}
                required
                className='form-input'
              />
            </div>
            <div className='form-group'>
              <InputColor
                label='Color'
                name='color'
                type='color'
                {...register('color')}
                onBlur={() => handleInputChange('color')}
                className='form-input'
              />
            </div>
          </section>

          {/* Categoríes */}
          <section className='categories-section'>
            <h2 className='section-title'>Categories</h2>
            <div className='add-category'>
              <select
                className='category-select'
                onChange={(e) => {
                  const selected = allCategories.find(
                    (cat) => cat.id === parseInt(e.target.value)
                  );
                  handleAddCategory(selected);
                }}
              >
                <option value=''>Select categories</option>
                {allCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Button
                leftIcon={<PlusIcon />}
                onClick={handleOpenNewCategoryModal}
                type='button'
              >
                New Category
              </Button>
            </div>
            <div className='selected-categories'>
              {selectedCategories.map((category) => (
                <span
                  key={category.id}
                  className='category-chip'
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                  <button
                    type='button'
                    className='remove-category-btn'
                    onClick={() => handleRemoveCategory(category.id)}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </section>

          {/* Actions */}
          <section className='actions-section'>
            <Button type='submit' variant='default'>
              {note ? 'Update' : 'Create'}
            </Button>
            <Button type='button' variant='cancel' onClick={handleBackClick}>
              Cancel
            </Button>
          </section>
        </form>
      </main>
      {openFormModal && (
        <FormModalCategory
          onClose={handleCloseModal}
          onAddCategoryToNote={(newCategory) => {
            setAllCategories((prevCategories) => [
              ...prevCategories,
              newCategory,
            ]);
          }}
        />
      )}
    </>
  );
}
