import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { thunkLoadSingleItem } from '../../../store/items'
import * as utils from '../../../store/utils'
import { useParams } from 'react-router-dom'
import ImageCarousel from './ImageCarousel'
import './SingleItemPage.css'

const SingleItemPage = () => {
  const dispatch = useDispatch()
  const item = useSelector((state) => state.items.singleItem)
  const user = useSelector(store=> store.session?.user)

  const { itemId } = useParams()

  useEffect(() => {
    dispatch(thunkLoadSingleItem(itemId, user?.id))
  }, [dispatch])

  return (
    <div className="single-item-page-container">
      <div className="large-img-container">
        {item
          ? <ImageCarousel images={item.images?.length ? item.images : null}/>
          : null}
      </div>

      <div className="item-info-buttons-container">
        <span id="item-name">{item.name}</span>
        <span>Size {item.size}</span>
        <span>Color {item.color}</span>
        <span>Condition {item.condition}</span>
        <span id="item-price">${item.price}</span>
        <span>+${item.shipping_cost} Shipping - Europe to United States</span>
        <button>Purchase</button>
        <button>Offer</button>
        <button>Message</button>
        <span>Description<br />{item.description}</span>
        <span>Tags</span>
        <span>Posted on {item.created_at}</span>
      </div>
    </div>
  )
}

export default SingleItemPage;
