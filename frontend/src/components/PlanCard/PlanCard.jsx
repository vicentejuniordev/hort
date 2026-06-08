
import { Check, Crown } from "lucide-react";
import "./style.css";

export default function PlanCard({ plan }) {
  return (
    <div
      className={`plan-card ${
        plan.recommended ? "recommended" : ""
      }`}
    >
      {plan.recommended && (
        <div className="plan-badge">
          Mais Popular
        </div>
      )}

      <div className="plan-header">
        <div className="plan-icon-box">
          {typeof plan.icon === "string" ? (
            <img src={plan.icon} alt={plan.name} />
          ) : (
            <plan.icon className="plan-icon" />
          )}
        </div>

        <div className="plan-info">
          <h3>{plan.name}</h3>
          <p>{plan.description}</p>
        </div>
      </div>

      <div className="plan-price">
        <strong>
          R$ {plan.price.toFixed(2).replace(".", ",")}
        </strong>
        <span>/mês</span>
      </div>

      <div className="plan-features">
        {plan.features.map((feature, index) => (
          <div
            key={index}
            className="plan-feature"
          >
            <Check className="plan-feature-icon" />
            {feature}
          </div>
        ))}
      </div>

      <button className="plan-button">
        Assinar Plano
      </button>
    </div>
  );
}