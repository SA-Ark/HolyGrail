import React from "react";
import './FilterButtons.css';

const FilterButtons = ({ filterItem, setFilterItems, filters, items }) => {
    return (
        <>
            <div>
                <h5 id="filters-label">Filters:</h5>
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
                    className="all-filter-btn icon-button"
                    onClick={() => setFilterItems(items)}
                >
                    Reset
                </button>
            </div>
        </>
    );
};

export default FilterButtons;