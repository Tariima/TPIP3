import React, { useEffect, useState } from "react";
import "./Categories.css";
import CategoryItem from "../categoriesItem/CategoryItem";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerCategorias } from "../../services/api";

const imagenCategoriaDefault =
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop";

function Categories() {
  const { mesaId, accountId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    obtenerCategorias().then((data) => {
      const categoriasConImagen = data.map((categoria) => ({
        ...categoria,
        imagen: categoria.imagen || imagenCategoriaDefault,
      }));

      setCategories(categoriasConImagen);
    });
  }, []);

  return (
    <div className="categories-container">
      <header className="categories-header">
        <button className="back-button" onClick={() => navigate(`/${mesaId}`)}>←</button>
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
        🛒 Ver Carrito
      </button>
    </div>
  );
}

export default Categories;
