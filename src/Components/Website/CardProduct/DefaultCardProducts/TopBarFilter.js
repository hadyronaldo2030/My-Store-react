import React from "react";
import "./TopBar.css";

export default function TopBarFilter({
    totalResults,
    perPage,
    setPerPage,
    toggleView,
    isGridView,
    applyFilters,
}) {
    return (
        <div className="top_bar_filter">
            {/* search results */}
            <div className="search_results">
                Search results <span>{totalResults}</span>
            </div>
            <div className="d-flex align-items-center gap-3">
                {/* per page */}
                <div>
                    <select
                        value={perPage}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                    >
                        <option value="50">50 per page</option>
                        <option value="40">40 per page</option>
                        <option value="30">30 per page</option>
                        <option value="10">10 per page</option>
                    </select>
                </div>
                {/* btn filter */}
                <button onClick={applyFilters}>
                    <i className="fa-duotone fa-light fa-sliders"></i> Filter
                </button>
                {/* toggle grid & inline */}
                <button onClick={toggleView}>
                    {isGridView ? (
                        <i className="fa-solid fa-bars-progress"></i>
                    ) : (
                        <i className="fa-solid fa-grid-2"></i>
                    )}
                </button>
            </div>
        </div>
    );
}
