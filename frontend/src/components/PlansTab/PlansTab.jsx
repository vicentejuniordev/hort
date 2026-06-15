import PlanCard from "../PlanCard/PlanCard";
import "./style.css";

export default function PlansTab({ plans }) {
  return (
    <section className="plans-tab">
      <div className="plans-header">
        <h2>Escolha seu Plano</h2>
        <p>Selecione o plano ideal para suas necessidades</p>
      </div>

      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </section>
  );
}