import React, { useEffect, useState } from "react";
import "./Categories.css";
import CategoryItem from "../categoriesItem/CategoryItem";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerCategorias } from "../../services/api";

function Categories() {
  const { mesaId, accountId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    obtenerCategorias().then((data) => setCategories(data));
  }, []);

  return (
    <div className="categories-container">
      <header className="categories-header">
        <button className="back-button" onClick={() => navigate(`/${mesaId}/cuentas`)}>←</button>
        <h2>Categorías</h2>
      </header>
      <div className="categories-grid">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            accountId={accountId}
          />
        ))}
      </div>
      <button 
        className="floating-cart-button" 
        onClick={() => navigate(`/${mesaId}/cart/${accountId}`)}
      >
        Ver Carrito
      </button>
    </div>
  );
}

export default Categories;
