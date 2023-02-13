//! To Do:
// Verify how preview img is coming into component and make sure it is implemented properly
// Verify how liked is coming into component and make sure it is implemented properly

// ------------------------------------------------------

import { useHistory } from 'react-router'
import './ItemCard.css'

const ItemCard = ({ item }) => {
    const history = useHistory()
    const clickHandler = (e) => {
        history.push(`/item/${item.id}`)
    }

    return (
        <div className="item-card-container">
            <img onClick={clickHandler} src={item.preview_url} alt="a product image" className="spot-card-img" />
            <div className="item-info-container">
                <div className='name-size-container'>
                    <span className='listing-name'>
                        {item.name}
                    </span>
                    <span className='listing-size'>
                        {item.size}
                    </span>
                </div>
                <span className='listing-description'>
                    {item.description}
                </span>
                <div className='price-like-container'>
                    <span className='listing-price'>
                        ${item.price}
                    </span>
                    <span className='listing-liked'>
                        ♡{item.liked}
                    </span>
                </div>
            </div>
        </div>

    )
}

export default ItemCard;
