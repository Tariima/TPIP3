import React, { useEffect, useState } from "react";
import "./Categories.css";
import CategoryItem from "../categoriesItem/CategoryItem";
import { useParams } from "react-router-dom";
import { obtenerCategorias } from "../../services/api";

const imagenCategoriaDefault =
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop";

function Categories() {
  const { accountId } = useParams();
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
