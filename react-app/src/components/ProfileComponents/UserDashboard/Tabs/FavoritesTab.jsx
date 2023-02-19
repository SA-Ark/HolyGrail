import { deNormalize } from "../../../../store/utils";
import ItemCard from "../../../ItemsDisplayComponents/ItemCard";
import './FavoritesTab.css';

const FavoritesTab = ({favoriteItems, setFavoritesUpdated}) => {

    const favoritesList = deNormalize(favoriteItems)

    //!@#$ need liked items to come in as prop
    return (
        <div className="favorites-container">
            <div className="fav-card-container">
                {
                    favoritesList?.length
                        ? favoritesList.map((favoriteItem) => {
                            return <ItemCard classProp="fav-item-card" item={favoriteItem.item} key={favoriteItem.item.id} setFavoritesUpdated={setFavoritesUpdated} />
                        })
                        : null
                }
            </div>
        </div>
    )
}

export default FavoritesTab;
