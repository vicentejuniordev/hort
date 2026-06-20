import "./ProducerDashboard.css";
import {
  Bell,
  Home,
  Sprout,
  Send,
  User,
  Plus,
} from "lucide-react";

export default function ProducerDashboard() {
  return (
    <div className="producer-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200"
          alt="Horta"
          className="farm-avatar"
        />

        <div className="logo-container">
          <Sprout size={22} />
          <span>HORT</span>
        </div>
      </div>

      {/* SAUDAÇÃO */}
      <div className="welcome-section">
        <h3>Olá, Horta Nossa Senhora da Guia</h3>

        <Bell
          size={16}
          color="#C8D8C1"
          fill="#C8D8C1"
        />
      </div>

      {/* CARDS SUPERIORES */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💵</div>

          <span className="stat-value">
            R$150,00
          </span>

          <p>Ganhos de hoje</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🧺</div>

          <span className="stat-value">5</span>

          <p>Cestas para enviar</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚜</div>

          <span className="stat-value">5</span>

          <p>Entregas concluídas</p>
        </div>
      </div>

      {/* CESTAS */}
      <h2 className="section-title">
        Suas cestas Ativas
      </h2>

      <div className="basket-container">
        <div className="basket-card">
          <p>🧺 Cesta de Verduras</p>

          <button>
            Gerenciar
          </button>
        </div>

        <div className="basket-card">
          <p>🧺 Cesta de Frutas</p>

          <button>
            Gerenciar
          </button>
        </div>
      </div>

      {/* NOVA CESTA */}
      <div className="add-container">
        <button className="add-button">
          <Plus size={12} />
          Adicionar nova cesta
        </button>
      </div>

      {/* RELATÓRIO */}
      <h2 className="section-title">
        Relatórios de Entregas
      </h2>

      <div className="chart-card">
        <img
          src="https://quickchart.io/chart?c={type:'line',data:{labels:[1,2,3,4,5,6,7],datasets:[{label:'concluidas',borderColor:'green',fill:false,data:[1,7,4,8,18,10,13]},{label:'pendentes',borderColor:'orange',fill:false,data:[0,3,2,3,7,3,4]}]}}"
          alt="grafico"
        />
      </div>

      {/* MENU */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <Home size={14} />
        </div>

        <div className="nav-item">
          <Sprout size={14} />
        </div>

        <div className="nav-item">
          <Send size={14} />
        </div>

        <div className="nav-item">
          <User size={14} />
        </div>
      </div>
    </div>
  );
}
