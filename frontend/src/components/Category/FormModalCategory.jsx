import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { categorySchema } from '../../validations/categorySchema';
import { XIcon } from '../../assets/icons';
import Button from '../ui/Button';
import Input from '../ui/Input';
import InputColor from '../ui/InputColor';
import useCategoryStore from '../../store/categoryStore';
import '../../styles/components/formModal.css';

const FormModalCategory = ({ onClose, category, onAddCategoryToNote }) => {
  const { createCategory, updateCategory, isLoading, error, clearError } =
    useCategoryStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    setValue,
  } = useForm({ resolver: zodResolver(categorySchema) });

  useEffect(() => {
    if (category) {
      setValue('name', category.name);
      setValue('color', category.color);
    }
  }, [category, setValue]);

  const handleInputChange = async (field) => {
    await trigger(field);
  };

  const onSubmit = async (data) => {
    try {
      if (category) {
        await updateCategory(category.id, data);
        toast.success('Category successfully updated');
        reset();
        navigate(0); 
      } else {
        const newCategory = await createCategory(data);
        toast.success('Category successfully create');
        if (onAddCategoryToNote) {
          onAddCategoryToNote(newCategory);
        } else {
          navigate(0); 
        }
      }
      onClose();
    } catch (error) {
      toast.error(
        `An error occurred while carrying out: ${error.message || 'Unknown error'}`
      );
      console.error(error);
      clearError();
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
      clearError();
    }
  }, [error, clearError]);

  return (
    <div className='modal-container'>
      <form onSubmit={handleSubmit(onSubmit)} className='modal-content'>
        <div className='modal-header'>
          <h1 className='modal-title'>
            {category ? 'Edit Category' : 'New Category'}
          </h1>
          <Button variant='ghost' size='icon' onClick={onClose} className='close-button'  >
            <XIcon />
          </Button>
        </div>
        <div className='modal-body'>
          <div className='form-grid'>
            <div>
              <Input
                label='Name' type='text' name='name'
                placeholder='Name of the category' {...register('name')}
                onBlur={() => handleInputChange('name')}
                isError={!!errors.name}
                errorMessage={errors.name?.message}
                required
                className='form-s-input'
              />
            </div>
          </div>
          <div className='form-grid'>
            <div>
              <InputColor label='Color' name='color' type="color" {...register('color')}
                onBlur={() => handleInputChange('color')}
                className='form-modal-input'
              />
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <Button type='submit' variant='default' size='default' disabled={isLoading}>
            {category ? 'Update Category' : 'Add Category'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormModalCategory;
