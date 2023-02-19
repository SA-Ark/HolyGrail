import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkLoadItems } from "../../store/items";

const SearchFilter = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    
    const items = useSelector(state => state.items.allItems);
    const itemsArr = Object.entries(items);
    console.log("ALL ITEMS ===>", itemsArr);
    

    const getFilteredItems = (query, items) => {
        if (!query) {
            return items;
        }
        return itemsArr.filter(([key, value]) => value.name.includes(query));
    }
    
    const filteredItems = getFilteredItems(query, items);
    console.log("FILTERED ITEMS ===>", filteredItems);

    useEffect(() => {
        dispatch(thunkLoadItems())
    }, [dispatch]);


    return (
        <div className="search-container">
			<div className="input-group">
				<input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="search-input" />
				<button onClick={(e) => setQuery(e.target.value)} className="search-button">Search</button>
			</div>
		</div>
    )
}

export default SearchFilter;