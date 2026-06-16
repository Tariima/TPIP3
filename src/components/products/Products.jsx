import { useEffect, useState } from "react";
import ProductItem from "../productItem/ProductItem";
import { useParams, useNavigate } from "react-router-dom";
import "./Products.css";
import { obtenerProductos } from "../../services/api";

const imagenProductoDefault = "https://picsum.photos/300/200";

function Products() {
  const { mesaId, accountId, categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    obtenerProductos().then((data) => {
      const productosConImagen = data.map((producto) => ({
        ...producto,
        imagen: producto.imagen || imagenProductoDefault,
      }));

      setProducts(productosConImagen);
    });
  }, []);

  const filteredProducts = products.filter((product) => {
    return product.Categorium?.nombre.toLowerCase() === categoryName;
  });

  return (
    <div className="products-container">
      <header className="products-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
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
        🛒 Ver Carrito
      </button>
    </div>
  );
}

export default Products;
