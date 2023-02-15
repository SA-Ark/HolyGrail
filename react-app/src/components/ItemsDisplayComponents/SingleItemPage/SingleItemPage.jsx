import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { thunkLoadSingleItem } from '../../../store/items'
import { useHistory } from 'react-router-dom'
import * as utils from '../../../store/utils'
import { useParams } from 'react-router-dom'
import ImageCarousel from './ImageCarousel'
import ProfileCard from "../../Cards/ProfileCard";
import './SingleItemPage.css'

const SingleItemPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const item = useSelector((state) => state.items.singleItem)
  const user = useSelector(store => store.session?.user)

  const { itemId } = useParams()

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(thunkLoadSingleItem(itemId, user?.id))
  }, [dispatch])

  return (
    <div className="single-item-page-container">
      <div className='single-item-carousel-container'>
        {item?.images?.map((image, index) => (
          <div className='carousel-item-container' key={index} style={{ display: index === currentImageIndex ? 'block' : 'none' }}>
            <img className='single-item-image' src={image.url} alt={`Image ${currentImageIndex + 1}`} />
          </div>
        ))}
        <div className='arrow-container'>
          <div
            className='back'
            onClick={() => setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : item.images?.length - 1)}
          >back</div>
          <div
            className='forward'
            onClick={() => setCurrentImageIndex(currentImageIndex < item.images?.length - 1 ? currentImageIndex + 1 : 0)}
          >forward</div>
        </div>
      </div>

      <div className="item-info-buttons-container">
        <div className='item-name-favs-container'>
          <span id="item-name">{item.name}</span>
          <div
            className='item-favorites'
          >♡
          </div>
        </div>
        <span className='size'>Size {item.size}</span>
        <span className='color'>Color {item.color}</span>
        <span className='condition'>Condition {item.condition}</span>
        <span className='price'>${item.price}</span>
        <span className='shipping'>+${item.shipping_cost} Shipping - Europe to United States</span>
        <button className='purchase-button' onClick={e=> history.push('/orderformtest')}>Purchase</button>
        {/* <button>Offer</button> */}
        {/* <button>Message</button> */}
        <div><ProfileCard /></div>

        <span className='item-desc-title'>Description</span>
        <span className='item-desc'>{item.description}</span>
        {/* <span className='tags'>Tags</span> */}
        {/* <span className='item-post-date'>Posted on {item.created_at}</span> */}


      </div>
    </div>
  )
}

export default SingleItemPage;
