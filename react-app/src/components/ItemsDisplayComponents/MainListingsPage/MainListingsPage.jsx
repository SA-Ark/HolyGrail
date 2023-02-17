import ItemCard from '../ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as utils from '../../../store/utils';
import { thunkLoadItems } from '../../../store/items';
import { thunkLoadFavorites } from '../../../store/favorites';
import FilterButtons from './FilterButtons';
import './MainListingsPage.css';

const MainListingsPage = () => {
    const dispatch = useDispatch();
    const items = utils.deNormalize(useSelector(store => store.items.allItems));
    const user = useSelector(store => store.session?.user);
    const [multipleItems, setMultipleItems] = useState(items);
    const [update, setUpdate] = useState(true);

    const filters = [ ...new Set(items.map((Val) => Val.category_tags))];
    console.log("FILTERS ===>", filters);
    // console.log("ITEMS ===>", items);

    useEffect(() => {
        console.log("UPDATE STATE")
        console.log("ITEM ===>", multipleItems)
    }, [update])

    const filterItem = (curcat) => {
        const newItems = items.filter((newVal) => {
            return newVal.category_tags === curcat;
        });
        setUpdate(!update);
        console.log("NEW ITEMS ===>", newItems);
        setMultipleItems(newItems);
    };


    useEffect(() => {
        dispatch(thunkLoadItems(user?.id))
        dispatch(thunkLoadFavorites())
    }, [dispatch])

    return (
        <div className="main-listings-container">
            <div className="filters">
                <FilterButtons setMultipleItems={setMultipleItems} filters={filters} items={items} filterItem={filterItem} />
            </div>
            <div className="items-display-container">
                {
                    multipleItems.length
                        ? multipleItems.map(item => <ItemCard classProp="home-item-card" item={item} key={item.id} />)
                        : items.map(item => <ItemCard classProp="home-item-card" item={item} key={item.id} />)
                }
            </div>
        </div>
    )
}

export default MainListingsPage;
