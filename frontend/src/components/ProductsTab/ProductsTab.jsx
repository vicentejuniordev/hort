import { forwardRef } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./style.css";

const ProductsTab = forwardRef(function ProductsTab(
  { products, updateQuantity },
  ref
) {
  return (
    <section className="products-tab" ref={ref}>
      <div className="products-header">
        <h2>Produtos Disponíveis</h2>
        <p>Adicione ao carrinho para comprar avulso</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>
    </section>
  );
});

export default ProductsTab;