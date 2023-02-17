import React from "react";

const FilterButtons = ({ filterItem, setMultipleItems, filters, items }) => {
    return (
        <>
            <div>
                {filters.map((Val, id) => {
                    // console.log("VAL ===>", Val)
                    return (
                        <button
                            className="cat-filter-btn"
                            onClick={() => console.log("FILTERED ITEMS ===>", filterItem(Val))}
                            key={id}
                        >
                            {Val}
                        </button>
                    );
                })}
                <button
                    className="all-filter-btn"
                    onClick={() => console.log("ALL ITEMS ===>", setMultipleItems(items))}
                >
                    Reset
                </button>
            </div>
        </>
    );
};

export default FilterButtons;