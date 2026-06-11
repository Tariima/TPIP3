import React from "react";
import "./Categories.css";
import categories from "../test/categories";
import CategoryItem from "../categoriesItem/CategoryItem";
import { useParams } from "react-router-dom";

function Categories() {
  const { accountId } = useParams();
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          accountId={accountId}
        />
      ))}
    </div>
  );
}

export default Categories;
