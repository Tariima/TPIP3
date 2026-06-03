import React from "react";
import "./Categories.css";
import categories from "../test/categories";
import CategoryItem from "../categoriesItem/CategoryItem";

function Categories() {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

export default Categories;
