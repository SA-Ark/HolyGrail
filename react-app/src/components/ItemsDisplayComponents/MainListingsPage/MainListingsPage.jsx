import ItemCard from '../ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as utils from '../../../store/utils';
import { thunkLoadItems } from '../../../store/items';
import { thunkLoadFavorites } from '../../../store/favorites';
import FilterButtons from './FilterButtons';
import { actionDeleteSearch } from '../../../store/search';
import './MainListingsPage.css';

const MainListingsPage = () => {
    const dispatch = useDispatch();
    const items = utils.deNormalize(useSelector(store => store.items.allItems));
    const user = useSelector(store => store.session?.user);
    const searchFilters = useSelector(store => store.filtered);
    const [filterItems, setFilterItems] = useState(items);
    let finalItems = items;

    useEffect(() => {


    }, [finalItems, searchFilters, filterItems])


    const filters = [ ...new Set(items.map((Val) => Val.category_tags))];

    const filterItem = (curcat) => {
        const newItems = items.filter((newVal) => {
            return newVal.category_tags === curcat;
        });

        setFilterItems(newItems);
        // dispatch(actionDeleteSearch());
    };





    // }, [searchFilters]);
    if (filterItems.length) {
        finalItems = filterItems;
    }

    if (Object.values(searchFilters?.filtered).length) {
        const filterSet = new Set();
        for (let item of finalItems) {
            filterSet.add(item.id)
        }

        const tempItems2 = [];
        for (let item of Object.values(searchFilters?.filtered)) {

            if (filterSet.has(item?.id)) {
                tempItems2.push(item);
            }
        }
   
        finalItems = tempItems2;


    }



    useEffect(() => {
        dispatch(thunkLoadItems(user?.id))
        if (user?.id){

            dispatch(thunkLoadFavorites())
        }
    }, [dispatch])

    return (
        <div className="main-listings-container">
            <div className="filters">
                <FilterButtons setFilterItems={setFilterItems} filters={filters} items={items} filterItem={filterItem} />
            </div>
            <div className="items-display-container">
                {/* { searchFilters.length ?

                    searchFilters.map(item => item?.seller_id !== user?.id ? <ItemCard classProp="home-item-card" item={item} key={item.id} /> : null)
                } :
                {
                    filterItems.length
                        ? filterItems.map(item => item?.seller_id !== user?.id ? <ItemCard classProp="home-item-card" item={item} key={item.id} /> : null)
                        : items.map(item => item?.seller_id !== user?.id  ? <ItemCard classProp="home-item-card" item={item} key={item.id} /> : null )
                } */}
                {   finalItems.length?
                    finalItems.map(item => item?.seller_id !== user?.id  ? <ItemCard classProp="home-item-card" item={item} key={item.id} />: null)
                    : <div>"NO ITEMS FOUND MATCHING THIS SEARCH/FILTER CRITERIA"</div>
                }
            </div>
        </div>
    )
}

export default MainListingsPage;
