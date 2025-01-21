import React, { useState } from 'react';

const CategoryFilter = ({ visibleCategories, selectedCategories, onAddCategory, onRemoveCategory,
}) => {
  return (
    <section className="categories-section">
      <h2 className="section-title">Categories</h2>
      <div className="add-category">
        <select
          className="category-select"
          onChange={(e) => {
            const selectedValue = parseInt(e.target.value);
            if (selectedValue === -1) {
              onAddCategory({ id: -1, name: "No categories", color: '#000000' });
            } else {
              const selected = visibleCategories.find((cat) => cat.id === selectedValue);
              if (selected) onAddCategory(selected);
            }
          }}
        >
          <option value="">Select categories</option>
          <option value="-1">No categories</option>
          {visibleCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="selected-categories">
        {selectedCategories.map((category) => (
          <span
            key={category.id}
            className="category-chip"
            style={{ backgroundColor: category.color }}
          >
            {category.name}
            <button
              type="button"
              className="remove-category-btn"
              onClick={() => onRemoveCategory(category.id)}
            >
              x
            </button>
          </span>
        ))}
      </div>
    </section>
  );
}

export default CategoryFilter;