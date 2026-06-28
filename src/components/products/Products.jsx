// lista de productos de una categoria que el cliente puede agregar al carrito
import { useEffect, useState } from "react";
import ProductItem from "../productItem/ProductItem";
import { useParams, useNavigate } from "react-router-dom";
import "./Products.css";
import { obtenerProductos } from "../../services/api";

function Products() {
  const { mesaId, accountId, categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // traigo todos los productos del backend al cargar la pantalla
  useEffect(() => {
    obtenerProductos().then((data) => setProducts(data));
  }, []);

  // me quedo solo con los productos de la categoria que viene en la url
  const filteredProducts = products.filter((product) => {
    return product.Categorium?.nombre.toLowerCase() === categoryName;
  });

  return (
    <div className="products-container">
      <header className="products-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        {/* muestro el nombre de la categoria con la primera letra en mayuscula */}
        <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
      </header>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} accountId={accountId} />
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

export default Products;
