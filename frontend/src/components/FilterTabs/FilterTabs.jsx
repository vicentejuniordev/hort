import "./style.css";

export default function FilterTabs({
  filterTabs,
  activeFilter,
  setActiveFilter,
}) {
  return (
    <div className="filter-tabs">
      {filterTabs.map((tab) => {
        const isActive = activeFilter === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`filter-tab ${isActive ? "active" : ""}`}
          >
            {tab.label}

            {tab.count > 0 && (
              <span className="filter-tab-count">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}