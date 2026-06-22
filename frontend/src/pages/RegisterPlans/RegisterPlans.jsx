import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Leaf, AlertCircle } from 'lucide-react';
import './style.css';

export default function RegisterPlans() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    ciclo: '',
  });

  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }

  function validate() {
    const newErrors = {};
    if (!form.nome.trim()) newErrors.nome = 'Nome do plano é obrigatório.';
    if (!form.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória.';
    if (!form.preco.trim()) newErrors.preco = 'Preço é obrigatório.';
    if (!form.ciclo.trim()) newErrors.ciclo = 'Selecione o ciclo de entregas.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (validate()) {
      // Integração com backend aqui
      navigate(-1);
    }
  }

  return (
    <div className="rp-screen">
      {/* Header */}
      <div className="rp-header">
        <button className="rp-back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </button>
        <div className="rp-header-title">
          <h1>  Novo Plano</h1>
        </div>
        <Leaf size={18} className="rp-header-icon rp-header-icon-right" />
      </div>
      <div className="rp-content">
        {/* Card: Detalhe do Plano */}
        <div className="rp-card">
          <h2 className="rp-card-title">Detalhe do Plano</h2>

          <div className="rp-field">
            <label className="rp-label">Nome do Plano</label>
            <input
              type="text"
              className={`rp-input ${errors.nome ? 'rp-input-error' : ''}`}
              placeholder="Ex: Plano Básico"
              value={form.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
            />
            {errors.nome && (
              <p className="rp-error">
                <AlertCircle size={13} /> {errors.nome}
              </p>
            )}
          </div>

          <div className="rp-field">
            <label className="rp-label">Descrição Curta</label>
            <textarea
              className={`rp-textarea ${errors.descricao ? 'rp-input-error' : ''}`}
              placeholder="Descreva o que está incluso neste plano..."
              rows={4}
              value={form.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
            />
            {errors.descricao && (
              <p className="rp-error">
                <AlertCircle size={13} /> {errors.descricao}
              </p>
            )}
          </div>
        </div>

        {/* Card: Preço e Entrega */}
        <div className="rp-card">
          <h2 className="rp-card-title">Preço e Entrega</h2>

          <div className="rp-field">
            <label className="rp-label">Preço do Plano</label>
            <div className={`rp-input-prefix ${errors.preco ? 'rp-input-error' : ''}`}>
              <span className="rp-prefix">R$</span>
              <input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={form.preco}
                onChange={(e) => handleChange('preco', e.target.value)}
              />
            </div>
            {errors.preco && (
              <p className="rp-error">
                <AlertCircle size={13} /> {errors.preco}
              </p>
            )}
          </div>

          <div className="rp-field">
            <label className="rp-label">Ciclo de Entregas</label>
            <select
              className={`rp-select ${errors.ciclo ? 'rp-input-error' : ''}`}
              value={form.ciclo}
              onChange={(e) => handleChange('ciclo', e.target.value)}
            >
              <option value="">Selecione a frequência</option>
              <option value="semanal">Semanal</option>
              <option value="quinzenal">Quinzenal</option>
              <option value="mensal">Mensal</option>
            </select>
            {errors.ciclo && (
              <p className="rp-error">
                <AlertCircle size={13} /> {errors.ciclo}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button className="rp-submit-btn" onClick={handleSubmit}>
          Cadastrar Plano
        </button>
      </div>
    </div>
  );
}
