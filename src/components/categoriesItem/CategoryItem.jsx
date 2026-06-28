import React from "react";
import "./CategoryItem.css";
import { useNavigate, useParams } from "react-router-dom";

function CategoryItem({ category, accountId }) {
  const navigate = useNavigate();
  const { mesaId } = useParams();

  const handleClick = () => {
    navigate(`/${mesaId}/category/${accountId}/${category.nombre.toLowerCase()}`);
  };
  return (
    <div
      className="category-item"
      onClick={handleClick}
      style={category.imagen ? { backgroundImage: `url(${category.imagen})` } : undefined}
    >
      <div className="category-overlay">
        <h2>{category.nombre}</h2>
      </div>
    </div>
  );
}

export default CategoryItem;
