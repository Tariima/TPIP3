import products from "../test/products";
import ProductItem from "../productItem/ProductItem";
import { useParams } from "react-router-dom";
import "./Products.css";

function Products() {
  const { accountId, categoryName } = useParams();
  const filteredProducts = products.filter(
    (product) => product.category === categoryName,
  );

  return (
    <div className="products-container">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} accountId={accountId} />
      ))}
    </div>
  );
}

export default Products;
