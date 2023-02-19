import ItemCard from '../ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as utils from '../../../store/utils';
import { thunkLoadItems } from '../../../store/items';
import { thunkLoadFavorites } from '../../../store/favorites';
import FilterButtons from './FilterButtons';
import './MainListingsPage.css';
import { deNormalize } from '../../../store/utils';

const MainListingsPage = () => {
    const dispatch = useDispatch();
    const items = utils.deNormalize(useSelector(state => state.items?.allItems));
    const user = useSelector(state => state.session?.user);
    const [filterItems, setFilterItems] = useState(items);
    const [mainFavoritesUpdated, setMainFavoritesUpdated] = useState(false);

    const filters = [ ...new Set(items.map((Val) => Val.category_tags))];

    const filterItem = (curcat) => {
        const newItems = items.filter((newVal) => {
            return newVal.category_tags === curcat;
        });

        setFilterItems(newItems);
    };

    useEffect(() => {
        dispatch(thunkLoadItems(user?.id))
        dispatch(thunkLoadFavorites())
        setMainFavoritesUpdated(false)
    }, [dispatch, mainFavoritesUpdated])

    return (
        <div className="main-listings-container">
            <div className="filters">
                <FilterButtons setFilterItems={setFilterItems} filters={filters} items={items} filterItem={filterItem} />
            </div>
            <div className="items-display-container">
                {
                    filterItems.length
                        ? filterItems.map(item => item?.seller_id !== user?.id ? <ItemCard classProp="home-item-card" item={item} key={item.id} setFavoritesUpdated={setMainFavoritesUpdated} /> : null)
                        : items.map(item => item?.seller_id !== user?.id ? <ItemCard classProp="home-item-card" item={item} key={item.id} setFavoritesUpdated={setMainFavoritesUpdated} /> : null )
                }
            </div>
        </div>
    )
}

export default MainListingsPage;
