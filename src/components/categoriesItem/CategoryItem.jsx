import React from "react";
import "./CategoryItem.css";
import { useNavigate } from "react-router-dom";

function CategoryItem({ category, accountId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${accountId}/${category.nombre.toLowerCase()}`);
  };
  return (
    <div
      className="category-item"
      onClick={handleClick}
      style={{
        backgroundImage: `url(${category.imagen})`,
      }}
    >
      <div className="category-overlay">
        <h2>{category.nombre}</h2>
      </div>
    </div>
  );
}

export default CategoryItem;
