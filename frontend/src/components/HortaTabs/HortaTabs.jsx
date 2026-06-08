import "./style.css";

export default function HortaTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "sobre", label: "Sobre" },
    { id: "planos", label: "Planos" },
    { id: "produtos", label: "Produtos" },
  ];

  return (
    <div className="horta-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`horta-tab ${activeTab === tab.id ? "active" : ""}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}