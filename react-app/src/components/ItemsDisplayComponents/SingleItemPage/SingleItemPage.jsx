import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { thunkLoadSingleItem } from '../../../store/items'
import * as utils from '../../../store/utils'
import { useParams } from 'react-router-dom'
import ImageCarousel from './ImageCarousel'
import { ProfileCard } from '../../ProfileComponents/ProfileCard/ProfileCard'
import './SingleItemPage.css'

const SingleItemPage = () => {
  const dispatch = useDispatch()
  const item = useSelector((state) => state.items.singleItem)
  const user = useSelector(store=> store.session?.user)

  const { itemId } = useParams()

  console.log(item)

  useEffect(() => {
    dispatch(thunkLoadSingleItem(itemId, user?.id))
  }, [dispatch])

  return (
    <div className="single-item-page-container">
      <div className="img-container">
        {item
          ? <ImageCarousel images={item.images?.length ? item.images : null}/>
          : null}
      </div>
      
      <div className="item-info-buttons-container">
        <span id="item-name">{item.name}</span>
        <span id="item-size">Size {item.size}</span>
        <span id="item-color">Color {item.color}</span>
        <span id="item-condition">Condition {item.condition}</span>
        <span id="item-price">${item.price}</span>
        <span id="item-shipping">+${item.shipping_cost} Shipping - Europe to United States</span>
        <button id="purchase-btn">Purchase</button>
        <button id="offer-btn">Offer</button>
        <button id="message-btn">Message</button>
        <span id="item-description">Description<br />{item.description}</span>
        <span id="item-tags">Tags</span>
        <span id="item-created-at">Posted on {item.created_at}</span>
      </div>

      <div>
        <ProfileCard item={item} />
      </div>
    </div>
  )
}

export default SingleItemPage;
