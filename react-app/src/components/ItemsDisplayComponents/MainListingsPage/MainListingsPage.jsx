import ItemCard from '../ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import MultiSelect from "multiselect-react-dropdown";
import * as utils from '../../../store/utils';
import { thunkLoadItems } from '../../../store/items';
import { thunkLoadFavorites } from '../../../store/favorites';
import FilterButtons from './FilterButtons';
import './MainListingsPage.css';

const MainListingsPage = () => {
    const dispatch = useDispatch();
    const items = utils.deNormalize(useSelector(store => store.items.allItems));
    const user = useSelector(store=> store.session?.user);

    const [item, setItem] = useState(items);


    // spread operator displays all values from item categories
    // set only allows the single value of each kind to be displayed
    const filters = [ ...new Set(items.map((Val) => Val.category_tags))];
    console.log("FILTERS ===>", filters);
    console.log("ITEMS ===>", items);

    useEffect(() => {
        dispatch(thunkLoadItems(user?.id))
        dispatch(thunkLoadFavorites())
    }, [dispatch])

    return (
        <div className="main-listings-container">
            <div className="filters">
                
            </div>

            <br />

            <div className="items-display-container">
                {
                    items.length
                        ? items.map(item => <ItemCard classProp="home-item-card" item={item} key={item.id} />)
                        : null
                }
            </div>
        </div>
    )
}

export default MainListingsPage;
