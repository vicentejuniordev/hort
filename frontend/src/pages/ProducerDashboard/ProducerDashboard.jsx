import { useNavigate } from "react-router-dom";
import { ChevronRight, CircleDollarSign, Plus, Settings, ShoppingBasket, Truck } from "lucide-react";
import tomatoImage from "../../assets/icons/tomate.png";
import HeaderUser from "../../components/HeaderUser/HeaderUser";
import ProducerBottomNavigation from "../../components/ProducerBottomNavigation/ProducerBottomNavigation";
import ProducerSidebar from "../../components/ProducerSidebar/ProducerSidebar";
import "./ProducerDashboard.css";

const deliveryData = [
  { day: "Seg", completed: 4, pending: 2 },
  { day: "Ter", completed: 8, pending: 3 },
  { day: "Qua", completed: 15, pending: 5 },
  { day: "Qui", completed: 12, pending: 4 },
  { day: "Sex", completed: 18, pending: 6 },
  { day: "Sáb", completed: 14, pending: 3 },
  { day: "Dom", completed: 16, pending: 5 },
];

const activeBaskets = [
  { id: 1, name: "Cesta de Verduras", subscribers: 8 },
  { id: 2, name: "Cesta de Frutas", subscribers: 5 },
];

function DeliveryChart() {
  const width = 700;
  const height = 238;
  const padding = { top: 20, right: 22, bottom: 34, left: 34 };
  const maxValue = 20;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const point = (value, index) => ({
    x: padding.left + (innerWidth / (deliveryData.length - 1)) * index,
    y: padding.top + innerHeight - (value / maxValue) * innerHeight,
  });
  const pathFor = (key) => deliveryData.map((item, index) => {
    const { x, y } = point(item[key], index);
    return `${index === 0 ? "M" : "L"}${x} ${y}`;
  }).join(" ");

  return (
    <div className="producer-chart" role="img" aria-label="Relatório semanal de entregas concluídas e pendentes">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        {[0, 5, 10, 15, 20].map((value) => {
          const y = point(value, 0).y;
          return (
            <g key={value}>
              <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} className="producer-chart__grid" />
              <text x={padding.left - 10} y={y + 4} className="producer-chart__axis">{value}</text>
            </g>
          );
        })}
        <path d={pathFor("completed")} className="producer-chart__line producer-chart__line--completed" />
        <path d={pathFor("pending")} className="producer-chart__line producer-chart__line--pending" />
        {deliveryData.map((item, index) => {
          const completed = point(item.completed, index);
          const pending = point(item.pending, index);
          return (
            <g key={item.day}>
              <circle cx={completed.x} cy={completed.y} r="4" className="producer-chart__dot producer-chart__dot--completed" />
              <circle cx={pending.x} cy={pending.y} r="4" className="producer-chart__dot producer-chart__dot--pending" />
              <text x={completed.x} y={height - 10} textAnchor="middle" className="producer-chart__axis">{item.day}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function ProducerDashboard() {
  const navigate = useNavigate();
  const managePlans = () => navigate("/produtor/gerenciar-planos");

  const stats = [
    { label: "Ganhos de hoje", value: "R$ 150,00", icon: CircleDollarSign, tone: "green" },
    { label: "Cestas para enviar", value: "5", icon: ShoppingBasket, tone: "orange" },
    { label: "Entregas concluídas", value: "5", icon: Truck, tone: "blue" },
  ];

  return (
    <div className="producer-dashboard">
      <ProducerSidebar activeItem="home" />

      <div className="producer-dashboard__content">
        <HeaderUser variant="producer" />

        <main className="producer-main">
          <section className="producer-summary" aria-label="Resumo do dia">
            {stats.map(({ label, value, icon: Icon, tone }) => (
              <article className={`producer-stat producer-stat--${tone}`} key={label}>
                <span className="producer-stat__icon"><Icon size={22} /></span>
                <div><p>{label}</p><strong>{value}</strong><small>Atualizado hoje</small></div>
              </article>
            ))}
          </section>

          <section className="producer-section">
            <div className="producer-section__header">
              <div><p className="producer-section__eyebrow">GERENCIAMENTO</p><h2>Suas cestas ativas</h2></div>
              <button className="producer-button producer-button--primary" type="button" onClick={managePlans}><Plus size={18} /> Nova cesta</button>
            </div>
            <div className="producer-baskets">
              {activeBaskets.map((basket) => (
                <article className="producer-basket" key={basket.id}>
                  <span className="producer-basket__image"><img src={tomatoImage} alt="" /></span>
                  <div className="producer-basket__details"><h3>{basket.name}</h3><p>{basket.subscribers} assinantes</p></div>
                  <span className="producer-basket__status">Ativa</span>
                  <button type="button" onClick={managePlans} aria-label={`Gerenciar ${basket.name}`}><Settings size={17} /><span>Gerenciar</span><ChevronRight size={16} /></button>
                </article>
              ))}
            </div>
          </section>

          <section className="producer-section producer-section--report">
            <div className="producer-section__header">
              <div><p className="producer-section__eyebrow">ÚLTIMOS 7 DIAS</p><h2>Relatório de entregas</h2></div>
              <button className="producer-button producer-button--secondary" type="button">Ver relatório completo <ChevronRight size={16} /></button>
            </div>
            <article className="producer-report-card">
              <div className="producer-report-card__legend"><span><i className="producer-report-card__legend--completed" /> Concluídas</span><span><i className="producer-report-card__legend--pending" /> Pendentes</span></div>
              <DeliveryChart />
            </article>
          </section>
        </main>
      </div>

      <ProducerBottomNavigation activeItem="home" />
    </div>
  );
}
