import ItemCard from '../ItemsDisplayComponents/ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import * as utils from '../../store/utils';
import FilterButtons from '../ItemsDisplayComponents/MainListingsPage/FilterButtons';


const WomensWear = () => {
    const items = utils.deNormalize(useSelector(store => store.items.allItems));
    const user = useSelector(store => store.session?.user);

    const [filterItems, setFilterItems] = useState(items);

    const filters = [...new Set(items.map((Val) => Val.category_tags))];

    const filterItem = (curcat) => {


        const newItems = items.filter((newVal) => {
            return newVal.category_tags === curcat;
        });

        setFilterItems(newItems);
    };


    const womenItems = []
    for (let item of items) {
        if (item.gender_style === 'F') {
            womenItems.push(item)
        }
    }

    console.log('womenItems', womenItems)


    return (
        <div className="main-listings-container">
            <div className="filters">
                <FilterButtons setFilterItems={setFilterItems} filters={filters} items={items} filterItem={filterItem} />
            </div>
            <div className="items-display-container">

                {
                    filterItems.length
                        ? filterItems.map(item => item?.seller_id !== user?.id
                            ? <ItemCard classProp="home-item-card" item={item} key={item.id} />
                            : null)

                        : womenItems.map(item => item?.seller_id !== user?.id
                            ? <ItemCard classProp="home-item-card" item={item} key={item.id} />
                            : null)
                }
            </div>
        </div>
    )

}

export default WomensWear;