import { useEffect, useState, useMemo } from "react";


export function useVisibleCategories(notesData) {
  const [visibleCategories, setVisibleCategories] = useState([]);

  useEffect(() => {
    if (notesData && notesData.length > 0) {
      const categoriesMap = new Map();
      notesData.flatMap((note) => note.categories || []).forEach((category) => {
        categoriesMap.set(category.id, category);
      });
      setVisibleCategories(Array.from(categoriesMap.values()));
    } else {
      setVisibleCategories([]);
    }
  }, [notesData]);

  return visibleCategories;
}

export function useSelectedCategories() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const addCategory = (category) => {
    if (category.id === -1) {
      setSelectedCategories([category]);
    } else {
      setSelectedCategories((prev) => {
        const updatedCategories = prev.filter((cat) => cat.id !== -1);
        if (!updatedCategories.some((cat) => cat.id === category.id)) {
          updatedCategories.push(category);
        }
        return updatedCategories;
      });
    }
  };

  const removeCategory = (categoryId) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat.id !== categoryId));
  };

  return { selectedCategories, addCategory, removeCategory };
}


export function useFilteredNotes(notesData, selectedCategories) {
  return useMemo(() => {
    if (!notesData) return [];
    return notesData.filter((note) =>
      selectedCategories.every((selectedCategory) =>
        selectedCategory.id === -1
          ? note.categories.length === 0
          : note.categories.some((noteCategory) => noteCategory.id === selectedCategory.id)
      )
    );
  }, [notesData, selectedCategories]);
}