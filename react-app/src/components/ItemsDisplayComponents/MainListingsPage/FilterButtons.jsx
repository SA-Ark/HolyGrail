import React from "react";

const FilterButtons = ({ setItem, filters }) => {
    return (
        <>
            <div>
                {filters.map((Val, id) => {
                    return (
                        <button
                            className="cat-filter-btn"
                            key={id}
                        >
                            {Val}
                        </button>
                    );
                })}
                <button
                    className="all-filter-btn"
                    onClick={() => setItem()}
                >
                    All
                </button>
            </div>
        </>
    );
};

export default FilterButtons;