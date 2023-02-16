//! To Do:
// Verify how preview img is coming into component and make sure it is implemented properly
// Verify how liked is coming into component and make sure it is implemented properly

// ------------------------------------------------------

import {useState} from "react"
import { useHistory } from 'react-router'
import Buttons from '../../Buttons'
import './ItemCard.css'
const { LikeButton } = Buttons;

const ItemCard = ({ item }) => {
    const history = useHistory()
    // !@#$ need to dispatch an update to create an item like as well
    const clickHandler = (e) => {
        history.push(`/items/${item.id}`)
    }

    if (!item) return null

    return (
        <div className="item-card-container">
            <img onClick={clickHandler} src={item.preview_url} alt="a product image" className="spot-card-img" />
            <div className="item-info-container">
                <div className='name-size-container'>
                    <span className='listing-name'>
                        {item.name}
                    </span>
                    <br />
                    <span className='listing-size'>
                        {item.size}
                    </span>
                </div>
                <br />
                <span className='listing-description'>
                    {item.description}
                </span>
                <br />
                <div className='price-like-container'>
                    <span className='listing-price'>
                        ${item.price}
                    </span>
                    <br />
                    <span className='listing-liked'>
                        {/* !@#$ should be item.liked once we finish route to create liked */}
                        {
                            // liked
                                // ? <DeleteLikeButton itemId={item.id} liked={item.liked}/>
                            <LikeButton itemId={item.id} liked ={item.liked}/>
                        }
                    </span>
                    <br />
                </div>
            </div>
        </div>

    )
}

export default ItemCard;
