import { useEffect } from "react";
import { deNormalize } from "../../../../store/utils";
import ItemCard from "../../../ItemsDisplayComponents/ItemCard";
import './FavoritesTab.css';

const FavoritesTab = ({favoriteItems, setFavoritesUpdated}) => {

    //!@#$ need liked items to come in as prop
    return (
        <div className="favorites-container">
            <div className="fav-card-container">
                {
                        favoriteItems.map((favoriteItem) => {
                            return <ItemCard classProp="fav-item-card" item={favoriteItem} key={favoriteItem?.id} setFavoritesUpdated={setFavoritesUpdated} />
                        })
                }
            </div>
        </div>
    )
}

export default FavoritesTab;
