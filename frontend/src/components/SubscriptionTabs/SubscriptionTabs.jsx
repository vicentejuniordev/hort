import { Package, Sprout } from "lucide-react";
import "./style.css";

export default function SubscriptionTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="subscription-tabs-container">
      <div className="subscription-tabs">
        <button
          className={`subscription-tab ${
            activeTab === "planos" ? "active" : ""
          }`}
          onClick={() => setActiveTab("planos")}
        >
          <Package className="subscription-tab-icon" />
          <span>Planos</span>
        </button>

        <button
          className={`subscription-tab ${
            activeTab === "produtos" ? "active" : ""
          }`}
          onClick={() => setActiveTab("produtos")}
        >
          <Sprout className="subscription-tab-icon" />
          <span>Hortaliças</span>
        </button>
      </div>
    </div>
  );
}
