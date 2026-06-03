import React from "react";
import "./CategoryItem.css";
import { useNavigate } from "react-router-dom";

function CategoryItem({ category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.name.toLowerCase()}`);
  };
  return (
    <div
      className="category-item"
      onClick={handleClick}
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
