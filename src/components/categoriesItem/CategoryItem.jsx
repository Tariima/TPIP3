// tarjeta de una categoria, al tocarla lleva a los productos de esa categoria
import React from "react";
import "./CategoryItem.css";
import { useNavigate, useParams } from "react-router-dom";

function CategoryItem({ category, accountId }) {
  const navigate = useNavigate();
  const { mesaId } = useParams();

  const handleClick = () => {
    // armo la ruta con el nombre en minuscula porque asi se filtra despues
    navigate(`/${mesaId}/category/${accountId}/${category.nombre.toLowerCase()}`);
  };
  // si la categoria tiene imagen la pongo de fondo, sino queda sin fondo
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
