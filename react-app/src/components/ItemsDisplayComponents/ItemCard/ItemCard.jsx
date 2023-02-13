//! To Do:
// Verify how preview img is coming into component and make sure it is implemented properly
// Verify how liked is coming into component and make sure it is implemented properly

// ------------------------------------------------------

import {useState} from "react"
import { useHistory } from 'react-router'
import './ItemCard.css'

const ItemCard = ({ item }) => {
    const history = useHistory()
    const [liked, setLiked] = useState(false)
    // !@#$ need to dispatch an update to create an item like as well
    const clickHandler = (e) => {
        history.push(`/item/${item.id}`)
    }

    return (
        <div className="item-card-container">
            <img onClick={clickHandler} src={item.preview_url} alt="a product image" className="spot-card-img" />
            <div className="item-info-container">
                <div className='name-size-container'>
                    <span className='listing-name'>
                        name: {item.name}
                    </span>
                    <br />
                    <span className='listing-size'>
                        size: {item.size}
                    </span>
                </div>
                <br />
                <span className='listing-description'>
                    Description: {item.description}
                </span>
                <br />
                <div className='price-like-container'>
                    <span className='listing-price'>
                        Price: {item.price}
                    </span>
                    <br />
                    <span className='listing-liked' onClick={e=> setLiked(!liked)}>
                        {/* !@#$ should be item.liked once we finish route to create liked */}
                        {liked ? "❤️" : "💔"}
                    </span>
                    <br />
                </div>
            </div>
        </div>

    )
}

export default ItemCard;
