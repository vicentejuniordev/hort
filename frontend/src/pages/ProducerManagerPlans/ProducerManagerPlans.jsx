import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Box, PackagePlus, Sprout, Users, X } from "lucide-react";

import ProducerBottomNavigation from "../../components/ProducerBottomNavigation/ProducerBottomNavigation";
import ProducerSidebar from "../../components/ProducerSidebar/ProducerSidebar";
import BasketHeader from "../../components/BasketHeader/BasketHeader";
import SubscriptionTabs from "../../components/SubscriptionTabs/SubscriptionTabs";
import ManagerSectionHeader from "../../components/ManageSectionHeader/ManageSectionHeader";
import PlanManagementCard from "../../components/PlanManagementCard/PlanManagementCard";
import ProductManagementCard from "../../components/ProductManageCard/ProductManageCard";

import imgPlano from "../../assets/img/img_horta_01.png";
import imgCebola from "../../assets/icons/cebola.png";
import imgTomate from "../../assets/icons/tomate.png";
import "./style.css";

const initialPlans = [
  { id: 1, name: "Plano Básico", description: "Ideal para clientes que querem começar.", price: 19.99, subscribers: 2, icon: imgPlano },
  { id: 2, name: "Plano Essencial", description: "Plano completo para compras recorrentes.", price: 39.99, subscribers: 5, icon: imgPlano },
];

const initialProducts = [
  { id: 1, name: "Cebola", price: 2.5, stock: 30, icon: imgCebola },
  { id: 2, name: "Tomate", price: 3.5, stock: 25, icon: imgTomate },
  { id: 3, name: "Alface", price: 2, stock: 15, icon: imgPlano },
];

function initialDraft(type, item) {
  if (type === "plan") {
    return {
      name: item?.name ?? "",
      description: item?.description ?? "",
      price: item?.price ?? "",
    };
  }

  return {
    name: item?.name ?? "",
    price: item?.price ?? "",
    stock: item?.stock ?? 0,
  };
}

export default function ProducerManagerPlans() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("planos");
  const [plans, setPlans] = useState(initialPlans);
  const [products, setProducts] = useState(initialProducts);
  const [editor, setEditor] = useState(null);
  const [draft, setDraft] = useState({});
  const [formError, setFormError] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);

  function openEditor(type, item = null) {
    setEditor({ type, item });
    setDraft(initialDraft(type, item));
    setFormError("");
  }

  function closeEditor() {
    setEditor(null);
    setDraft({});
    setFormError("");
  }

  function updateDraft(field, value) {
    setDraft((currentDraft) => ({ ...currentDraft, [field]: value }));
  }

  function saveItem(event) {
    event.preventDefault();
    const numericPrice = Number(draft.price);
    const isPlan = editor.type === "plan";
    const numericQuantity = Number(isPlan ? 0 : draft.stock);

    if (!draft.name.trim() || !Number.isFinite(numericPrice) || numericPrice < 0 || (!isPlan && (!Number.isInteger(numericQuantity) || numericQuantity < 0))) {
      setFormError(isPlan ? "Preencha o nome e um preço válido." : "Preencha o nome, um preço válido e um estoque igual ou maior que zero.");
      return;
    }

    if (isPlan && !draft.description.trim()) {
      setFormError("Inclua uma breve descrição para o plano.");
      return;
    }

    if (isPlan) {
      const plan = {
        id: editor.item?.id ?? Date.now(),
        name: draft.name.trim(),
        description: draft.description.trim(),
        price: numericPrice,
        subscribers: editor.item?.subscribers ?? 0,
        icon: editor.item?.icon ?? imgPlano,
      };
      setPlans((currentPlans) => editor.item
        ? currentPlans.map((item) => item.id === plan.id ? plan : item)
        : [...currentPlans, plan]);
    } else {
      const product = {
        id: editor.item?.id ?? Date.now(),
        name: draft.name.trim(),
        price: numericPrice,
        stock: numericQuantity,
        icon: editor.item?.icon ?? imgPlano,
      };
      setProducts((currentProducts) => editor.item
        ? currentProducts.map((item) => item.id === product.id ? product : item)
        : [...currentProducts, product]);
    }

    closeEditor();
  }

  function confirmDelete() {
    if (!pendingDelete) return;

    if (pendingDelete.type === "plan") {
      setPlans((currentPlans) => currentPlans.filter((plan) => plan.id !== pendingDelete.item.id));
    } else {
      setProducts((currentProducts) => currentProducts.filter((product) => product.id !== pendingDelete.item.id));
    }
    setPendingDelete(null);
  }

  const isPlansTab = activeTab === "planos";
  const currentItems = isPlansTab ? plans : products;
  const itemLabel = isPlansTab ? "plano" : "produto";

  return (
    <div className="producer-manager-plans">
      <ProducerSidebar activeItem="baskets" />
      <div className="producer-manager-page">
      <header className="producer-manager-header">
        <BasketHeader
          title="Planos e produtos"
          onBack={() => navigate("/produtor")}
          onAdd={() => openEditor(isPlansTab ? "plan" : "product")}
        />
      </header>

      <SubscriptionTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <section className="producer-manager-overview" aria-label="Resumo do catálogo">
        <div className="producer-manager-overview__item">
          <span className="producer-manager-overview__icon"><PackagePlus size={18} /></span>
          <div><strong>{plans.length}</strong><small>Planos ativos</small></div>
        </div>
        <div className="producer-manager-overview__item">
          <span className="producer-manager-overview__icon"><Box size={18} /></span>
          <div><strong>{products.length}</strong><small>Produtos cadastrados</small></div>
        </div>
        <div className="producer-manager-overview__item">
          <span className="producer-manager-overview__icon"><Users size={18} /></span>
          <div><strong>{plans.reduce((total, plan) => total + plan.subscribers, 0)}</strong><small>Assinantes ativos</small></div>
        </div>
      </section>

      <main className="producer-manager-content">
        <ManagerSectionHeader
          title={isPlansTab ? "Planos ativos" : "Hortaliças ativas"}
          count={currentItems.length}
          itemName={itemLabel}
          buttonLabel={isPlansTab ? "Novo plano" : "Novo produto"}
          onAdd={() => openEditor(isPlansTab ? "plan" : "product")}
          showButton={false}
        />

        {currentItems.length === 0 ? (
          <section className="producer-manager-empty">
            {isPlansTab ? <PackagePlus size={34} /> : <Sprout size={34} />}
            <h2>Nenhum {itemLabel} cadastrado</h2>
            <p>Comece adicionando seu primeiro {itemLabel} para disponibilizá-lo aos clientes.</p>
            <button type="button" onClick={() => openEditor(isPlansTab ? "plan" : "product")}>Adicionar {itemLabel}</button>
          </section>
        ) : isPlansTab ? (
          <div className="plans-list">
            {plans.map((plan) => (
              <PlanManagementCard
                key={plan.id}
                plan={plan}
                onDelete={() => setPendingDelete({ type: "plan", item: plan })}
                onEdit={() => openEditor("plan", plan)}
              />
            ))}
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductManagementCard
                key={product.id}
                product={product}
                onDelete={() => setPendingDelete({ type: "product", item: product })}
                onEdit={() => openEditor("product", product)}
              />
            ))}
          </div>
        )}
      </main>

      <ProducerBottomNavigation activeItem="baskets" />

      {editor && (
        <div className="producer-manager-overlay" onMouseDown={closeEditor}>
          <section className="producer-manager-dialog" role="dialog" aria-modal="true" aria-labelledby="manager-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
            <header>
              <div>
                <p>{editor.item ? "EDITAR" : "NOVO CADASTRO"}</p>
                <h2 id="manager-dialog-title">{editor.item ? `Editar ${editor.type === "plan" ? "plano" : "produto"}` : `Adicionar ${editor.type === "plan" ? "plano" : "produto"}`}</h2>
              </div>
              <button type="button" className="producer-dialog-close" onClick={closeEditor} aria-label="Fechar"><X size={20} /></button>
            </header>

            <form onSubmit={saveItem} noValidate>
              <label htmlFor="manager-name">Nome</label>
              <input id="manager-name" value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} placeholder={editor.type === "plan" ? "Ex.: Plano Família" : "Ex.: Cenoura"} autoFocus />

              {editor.type === "plan" && <>
                <label htmlFor="manager-description">Descrição</label>
                <textarea id="manager-description" value={draft.description} onChange={(event) => updateDraft("description", event.target.value)} placeholder="Descreva brevemente o plano" rows="3" />
              </>}

              <div className={`producer-dialog-fields ${editor.type === "plan" ? "producer-dialog-fields--single" : ""}`}>
                <label htmlFor="manager-price">Preço (R$)
                  <input id="manager-price" value={draft.price} onChange={(event) => updateDraft("price", event.target.value)} inputMode="decimal" type="number" min="0" step="0.01" placeholder="0,00" />
                </label>
                {editor.type === "product" && <label htmlFor="manager-quantity">Estoque
                  <input id="manager-quantity" value={draft.stock} onChange={(event) => updateDraft("stock", event.target.value)} inputMode="numeric" type="number" min="0" step="1" />
                </label>}
              </div>

              {formError && <p className="producer-dialog-error" role="alert">{formError}</p>}
              <footer><button type="button" className="producer-dialog-cancel" onClick={closeEditor}>Cancelar</button><button type="submit" className="producer-dialog-save">Salvar</button></footer>
            </form>
          </section>
        </div>
      )}

      {pendingDelete && (
        <div className="producer-manager-overlay" onMouseDown={() => setPendingDelete(null)}>
          <section className="producer-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
            <span className="producer-confirm-dialog__icon"><AlertTriangle size={22} /></span>
            <h2 id="delete-dialog-title">Excluir {pendingDelete.type === "plan" ? "plano" : "produto"}?</h2>
            <p>“{pendingDelete.item.name}” será removido e esta ação não poderá ser desfeita.</p>
            <div><button type="button" onClick={() => setPendingDelete(null)}>Cancelar</button><button type="button" onClick={confirmDelete}>Excluir</button></div>
          </section>
        </div>
      )}
      </div>
    </div>
  );
}
