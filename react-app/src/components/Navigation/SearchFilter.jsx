import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkLoadItems } from "../../store/items";

import { actionLoadSearch } from "../../store/search";


const SearchFilter = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [query, setQuery] = useState('');

    const items = useSelector(state => state.items.allItems);
    const itemsArr = Object.values(items);

    let tempQuery = "";
    const updateQuery = (e) => {
        tempQuery = e.target.value;
    }

    const onSubmit = () => {
        setQuery(tempQuery);
        history.push("/items");
        getFilteredItems(tempQuery, items);
    }

    const getFilteredItems = (query, items) => {
        let filteredItems;
        if (!query) {
            // return items;
            filteredItems = items
        }else {

            filteredItems = itemsArr.filter(value => value.name.toLowerCase().includes(query.toLowerCase()));
        }

        dispatch(actionLoadSearch(filteredItems));

    }


    useEffect(() => {
        dispatch(thunkLoadItems())
    }, [dispatch]);


    return (
        <div className="search-container">
			<div className="input-group">
				<input type="text" onChange={updateQuery} placeholder="Search" className="search-input" />
				<button onClick={onSubmit} className="search-button">Search</button>
			</div>
		</div>
    )
}

export default SearchFilter;
