import { useHistory } from 'react-router'
import Buttons from '../../Buttons'
import { truncateName } from "../../../store/utils";
import './ItemCard.css'
const { LikeButton, UnlikeButton } = Buttons;

const ItemCard = ({ item, classProp, setFavoritesUpdated }) => {
    const history = useHistory()

    const newName = truncateName(item?.name);

    const clickHandler = (e) => {
        history.push(`/items/${item.id}`)
    }

    if (!item) return null

    return (
        <div className={classProp + " item-card"}>
            <img onClick={clickHandler} src={item.preview_url} alt="a product image" className="spot-card-img" />
            <div className="item-info-container">
                <div className='name-size-container'>
                    <span className='listing-name'>
                        {newName}
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
                        {!item.liked && <LikeButton item={item} setFavoritesUpdated={setFavoritesUpdated} />}
                        {item.liked && <UnlikeButton item={item} setFavoritesUpdated={setFavoritesUpdated} />}
                    </span>
                </div>
            </div>
        </div>

    )
}

export default ItemCard;
