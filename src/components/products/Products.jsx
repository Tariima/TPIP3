import { useEffect, useState } from "react";
import ProductItem from "../productItem/ProductItem";
import { useParams } from "react-router-dom";
import "./Products.css";
import { obtenerProductos } from "../../services/api";

const imagenProductoDefault = "https://picsum.photos/300/200";

function Products() {
  const { accountId, categoryName } = useParams();
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
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} accountId={accountId} />
      ))}
    </div>
  );
}

export default Products;
