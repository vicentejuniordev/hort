import { Clock, Phone, MapPin } from "lucide-react";
import "./style.css";

export default function AboutTab() {
  return (
    <section className="about-tab">
      <div className="about-card">
        <h2>Sobre a Horta</h2>

        <p>
          A Horta Nossa Senhora da Guia é uma iniciativa comunitária que oferece
          produtos frescos e orgânicos diretamente do produtor para você.
        </p>

        <div className="about-info-list">
          <InfoItem
            icon={Clock}
            title="Horário de Funcionamento"
            text="Seg - Sáb: 7h às 18h"
          />

          <InfoItem
            icon={Phone}
            title="Contato"
            text="(11) 98765-4321"
          />

          <InfoItem
            icon={MapPin}
            title="Endereço Completo"
            text="Rua das Flores, 123 - Jardim das Acácias"
          />
        </div>
      </div>

      <button className="map-button">Ver no Mapa</button>
    </section>
  );
}

function InfoItem({ icon: Icon, title, text }) {
  return (
    <div className="about-info-item">
      <div>
        <Icon className="about-info-icon" />
      </div>

      <section>
        <strong>{title}</strong>
        <span>{text}</span>
      </section>
    </div>
  );
}