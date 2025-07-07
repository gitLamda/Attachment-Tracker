import React from "react";

function FilterBar({ filters, onChange }) {
  return (
    <div className="filter-bar">
      {["module", "style", "status"].map((key) => (
        <select key={key} value={filters[key]} onChange={(e) => onChange(key, e.target.value)}>
          <option value="">All {key}s</option>
          {[...new Set(filters.allData.map((item) => item[key]))].map((val) => (
            <option key={val} value={val}>{val}</option>
          ))}
        </select>
      ))}
    </div>
  );
}

export default FilterBar;
