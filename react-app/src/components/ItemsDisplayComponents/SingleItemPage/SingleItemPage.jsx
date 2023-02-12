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

  console.log(item)

  useEffect(() => {
    dispatch(thunkLoadSingleItem(itemId, user?.id))
  }, [dispatch])

  return (
    <div className="single-item-page-container">
      <div className="catergory-info-banner">
       tags: {item?.category_tags}
      </div>
      <div className="large-img-container">
        {item
          ? <ImageCarousel images={item.images?.length ? item.images : null}/>
          : null}
      </div>
      <div className="item-info-buttons-container">
        <span>{item.name}</span>
        <span>${item.price}</span>
      </div>
    </div>
  )
}

export default SingleItemPage;
