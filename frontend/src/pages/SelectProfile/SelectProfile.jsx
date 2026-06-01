import React, { useState } from "react";
import logoHort from "../../assets/icons/logo.png";
import "./styles.css";

export default function SelectProfile() {
  const [profile, setProfile] = useState("");

  const handleSelect = (selectedProfile) => {
    setProfile(selectedProfile);
    console.log("Perfil selecionado:", selectedProfile);
    // Aqui você pode disparar o redirecionamento ou salvar no contexto global
  };

  return (
    <div className="profile-screen">
      {/* Botão Voltar */}
      <button className="back-button" onClick={() => window.history.back()}>
        <span className="arrow-left">&larr;</span> Voltar
      </button>

      {/* Logotipo vindo da sua pasta de assets */}
      <img className="logo-profile" src={logoHort} alt="Logo Hort" />

      <div className="text-container">
        <h1 className="profile-title">Como você quer usar o HORT?</h1>
        <p className="profile-subtitle">
          Assinaturas mensais de cestas personalizadas para você ou sua família
        </p>
      </div>

      {/* Grid contendo as duas opções de Cards */}
      <div className="cards-container">
        
        {/* Card: Quero Assinar */}
        <div className="card card-consumer">
          <div className="icon-box bg-green-gradient">
            {/* SVG da Sacolinha de Compras */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <h2>Quero Assinar</h2>
          <p className="card-description">
            Receba cestas de frutas e verduras orgânicas todo mês na sua casa
          </p>
          <ul className="benefits-list">
            <li><span class="dot green-dot"></span> Cestas 100% orgânicas</li>
            <li><span class="dot green-dot"></span> Escolha o dia de entrega</li>
            <li><span class="dot green-dot"></span> Cancele quando quiser</li>
          </ul>
          <button className="action-link text-green" onClick={() => handleSelect("cliente")}>
            Começar assinatura &rarr;
          </button>
        </div>

        {/* Card: Sou Produtor */}
        <div className="card card-producer">
          <div className="icon-box bg-orange-gradient">
            {/* SVG da Plantinha/Broto */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22V12"></path>
              <path d="M12 12c0-3.5 2.5-6 6-6"></path>
              <path d="M12 14c0-4 3.5-7 8-7"></path>
              <path d="M12 12c0-3.5-2.5-6-6-6"></path>
            </svg>
          </div>
          <h2>Sou Produtor</h2>
          <p className="card-description">
            Forneça produtos para as cestas mensais e alcance novos clientes
          </p>
          <ul className="benefits-list">
            <li><span class="dot orange-dot"></span> Renda recorrente mensal</li>
            <li><span class="dot orange-dot"></span> Gestão de entregas</li>
            <li><span class="dot orange-dot"></span> Sem intermediários</li>
          </ul>
          <button className="action-link text-orange" onClick={() => handleSelect("produtor")}>
            Começar a vender &rarr;
          </button>
        </div>

      </div>

      {/* Nota de rodapé */}
      <p className="notice-text">Não se preocupe, você poderá alterar seu perfil depois</p>

      {/* Selos de Confiança */}
      <footer className="badges-footer">
        <span><span className="check-icon green-text">&#10004;</span> 100% Seguro</span>
        <span><span className="check-icon green-text">&#10004;</span> Cadastro gratuito</span>
        <span><span className="check-icon green-text">&#10004;</span> Suporte dedicado</span>
      </footer>
    </div>
  );
}
