import "./FilterBar.css";

export default function FilterBar({ options, active, onChange }) {
  return (
    <div className="filter-bar">
      {options.map((opt) => (
        <button
          key={opt}
          className={`filter-pill${active === opt ? " filter-pill--active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
