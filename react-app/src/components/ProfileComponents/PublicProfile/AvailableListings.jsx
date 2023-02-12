import ItemCard from '../../ItemsDisplayComponents/ItemCard';


const AvailableListings = ({ items }) => {

    return (
        <div className="listings-tab-container">
            <div className="filters">
                <label htmlFor="Checkbox"><input type="checkbox" name="a_filter_checkbox" /></label>

                <input type="checkbox" name="a_filter_checkbox" />
                <input type="checkbox" name="a_filter_checkbox" />
                <input type="checkbox" name="a_filter_checkbox" />
                <input type="checkbox" name="a_filter_checkbox" />
            </div>
            <div className="listings-container">
                {
                    items?.length
                    ? items.map(item => {
                        <ItemCard item={item} />
                    })
                    : null
                }
            </div>
        </div>
    )
}

export default AvailableListings;
