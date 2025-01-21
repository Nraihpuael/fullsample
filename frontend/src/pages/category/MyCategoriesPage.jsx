import { memo, useCallback, useEffect, useState } from 'react';
import { PlusIcon } from '../../assets/icons';
import Button from '../../components/ui/Button';
import Categories from '../../components/Category/Categories';
import FormModalCategory from '../../components/Category/FormModalCategory';
import useCategoryStore from '../../store/categoryStore';
import '../../styles/pages/myDataPage.css';

export default function MyCategoriesPage() {
  const { fetchCategoryData, CategoriesData, isLoading } = useCategoryStore();
  const [openFormModal, setOpenFormModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const MemoizedCategories= memo(Categories);

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  const handleEditCategory = useCallback((category) => {
    setEditingCategory(category);
    setOpenFormModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenFormModal(false);
    setEditingCategory(null);
  }, []);

  const handleOpenNewCategoryModal = useCallback(() => {
    setEditingCategory(null);
    setOpenFormModal(true);
  }, []);

  
  return (
    <>
      <main className='data-container' style={{ marginTop: '5rem' }}>
        <div >
          <div className='header-container'>
            <h1 className='primary-title2'>My Categories</h1>
            <div className='button-container'>
              <Button leftIcon={<PlusIcon />} onClick={handleOpenNewCategoryModal}>
                New Category
              </Button>
            </div>
          </div>
          <div>
            <MemoizedCategories
              categories={CategoriesData}
              onEdit={handleEditCategory}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
      {openFormModal && (
        <FormModalCategory onClose={handleCloseModal} category={editingCategory} />
      )}
    </>
  );
}
