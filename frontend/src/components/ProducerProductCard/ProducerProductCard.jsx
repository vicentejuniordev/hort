import './style.css';

export default function ProducerProductCard({ product, onDelete, onEdit }) {
  return (
    <div className="producer-product-card">
      <div className="producer-product-image-box">
        <img src={product.image} alt={product.name} />
      </div>

      <h3 className="producer-product-name">{product.name}</h3>
      <p className="producer-product-price">
        Valor: R$ {product.price.toFixed(2).replace('.', ',')}
      </p>
      <p className="producer-product-stock">
        Estoque: {product.stock} unidades
      </p>

      <div className="producer-product-actions">
        <button
          className="producer-product-btn btn-delete"
          onClick={() => onDelete(product.id)}
        >
          Excluir
        </button>
        <button
          className="producer-product-btn btn-edit"
          onClick={() => onEdit(product.id)}
        >
          Editar
        </button>
      </div>
    </div>
  );
}