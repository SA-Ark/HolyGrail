import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { thunkLoadSingleItem } from '../../../store/items'
import { useParams } from 'react-router-dom'
import ProfileCard from "../../Cards/ProfileCard";
import './SingleItemPage.css'
import PurchaseModal from '../../PurchaseModal'
import EditModalButton from '../../EditModalButton'
import DeleteItemButton from '../../Buttons/DeleteItemButton'
import { thunkGetUser } from '../../../store/users';
import LoginRedirect from '../../LoginRedirectModal';
import Buttons from '../../Buttons'
const { LikeButton, UnlikeButton } = Buttons

const SingleItemPage = () => {
  const dispatch = useDispatch()
  const item = useSelector((state) => state.items.singleItem)
  const itemOwner = useSelector(state => state.users?.singleUser);
  const user = useSelector(store => store.session?.user)
  const [isloaded, setIsLoaded] = useState(false)

  const { itemId } = useParams()

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [like, setLike] = useState((item?.liked))

  useEffect(() => {
    dispatch(thunkLoadSingleItem(itemId, user?.id))
    .then(() => {
      setIsLoaded(true)
    })
    if (item?.seller_id) {
      dispatch(thunkGetUser(item?.seller_id))
    }
  }, [dispatch, item?.seller_id])

  if (!isloaded) return (<div>Loading...</div>)

  const previewIndex = item?.images?.findIndex(image => image.preview)

  if (previewIndex !== undefined && previewIndex !== 0) {
    item.images.splice(0, 0, item.images.splice(previewIndex, 1)[0])}

  const changeLike = (data) => {
    setLike(data.liked)
  }

  return (
    <div className="single-item-page-container">
      <div className="arrows-carousel-container">
        <div className='back icon-button'
          onClick={() => setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : item?.images?.length - 1)}>
          <i className="fa-solid fa-angles-left fa-3x"></i>
        </div>
        <div className='single-item-carousel-container'>
          {item?.images?.map((image, index) => (
            <div className='carousel-item-container' key={index} style={{ display: index === currentImageIndex ? 'block' : 'none' }}>
              <img className='single-item-image' src={image.url} alt={`Image ${currentImageIndex + 1}`} />
            </div>
          ))}
        </div>
        <div className='forward icon-button'
          onClick={() => setCurrentImageIndex(currentImageIndex < item.images?.length - 1 ? currentImageIndex + 1 : 0)}>
          <i className="fa-solid fa-angles-right fa-3x"></i>
        </div>
      </div>

      <div className="item-info-buttons-container">
        <div className='item-name-favs-container'>
          <span id="item-name">{item?.name}</span>
          <div className='item-favorite'>
            {
              !like &&
              <LikeButton itemId={item?.id} liked={like} changeLike={changeLike} />
            }
            {
              like &&
              <UnlikeButton itemId={item?.id} liked={like} changeLike={changeLike} />
            }
          </div>
        </div>
        <span className='size'>Size: {item?.size}</span>
        <span className='color'>Color: {item?.color}</span>
        <span className='condition'>Condition: {item?.condition}</span>
        <span className='price'>${item?.price}</span>
        <span className='shipping'>+${item?.shipping_cost} Shipping - Europe to United States</span>

        {user?.id ? (
          <>
            {item?.seller_id !== user.id ? (
              <PurchaseModal item={item} />
            ) : (
              <>
                <EditModalButton />
                <DeleteItemButton />
              </>
            )}
          </>
        ) : (
          <LoginRedirect />
        )}


        {/* <button>Offer</button> */}
        {/* <button>Message</button> */}
        <div><ProfileCard user={itemOwner} /></div>

        <span className='item-desc-title'>Description</span>
        <span className='item-desc'>{item?.description}</span>
        {/* <span className='tags'>Tags</span> */}
        {/* <span className='item-post-date'>Posted on {item.created_at}</span> */}


      </div>
    </div>
  )
}

export default SingleItemPage;
