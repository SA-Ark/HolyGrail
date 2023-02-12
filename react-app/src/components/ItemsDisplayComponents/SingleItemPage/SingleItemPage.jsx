import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { thunkLoadSingleItem } from '../../../store/items'
import * as utils from '../../../store/utils'
import { useParams } from 'react-router-dom'
import ImageCarousel from './ImageCarousel'

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
      <div className="catergory-info-banner">
        Category tag info
      </div>
      <div className="large-img-container">
        {item 
          ? <ImageCarousel images={item.images?.length ? item.images : null}/>
          : null}
      </div>
      <div className="item-info-buttons-container">
      </div>
    </div>
  )
}

export default SingleItemPage;