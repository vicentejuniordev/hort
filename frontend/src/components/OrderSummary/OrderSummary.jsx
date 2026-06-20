import "./style.css";

export default function OrderSummary({
  subtotal,
  serviceFee,
  deliveryFee,
  total,
}) {
  return (
    <section className="order-summary">
      <h3 className="order-summary-title">
        Resumo do Pedido
      </h3>

      <div className="order-summary-content">
        <SummaryItem
          label="Subtotal"
          value={subtotal}
        />

        <SummaryItem
          label="Taxa de serviço"
          value={serviceFee}
        />

        <SummaryItem
          label="Entrega"
          value={deliveryFee}
        />

        <div className="order-summary-total">
          <span>Valor Total</span>

          <strong>
            R$ {total.toFixed(2).replace(".", ",")}
          </strong>
        </div>
      </div>
    </section>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="summary-item">
      <span>{label}</span>

      <strong>
        R$ {value.toFixed(2).replace(".", ",")}
      </strong>
    </div>
  );
}