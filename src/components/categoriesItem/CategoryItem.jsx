import React from "react";
import "./CategoryItem.css";

function CategoryItem({ category }) {
  return (
    <div
      className="category-item"
      style={{
        backgroundImage: `url(${category.image})`,
      }}
    >
      <div className="category-overlay">
        <h2>{category.name}</h2>
      </div>
    </div>
  );
}

export default CategoryItem;
