import React from "react";
import './FilterButtons.css';

const FilterButtons = ({ filterItem, setFilterItems, filters, items }) => {
    return (
        <>
            <div className="filter-labels-container">
                <h5 id="filters-label">Category:</h5>
                {filters.map((Val, id) => {
                    return (
                        <button
                            className="cat-filter-btn icon-button"
                            onClick={() => filterItem(Val)}
                            key={id}
                        >
                            {Val}
                        </button>
                    );
                })}
                <button
                    className="all-filter-btn icon-button reset-btn"
                    onClick={() => setFilterItems(items)}
                >
                    Clear
                </button>
            </div>
        </>
    );
};

export default FilterButtons;