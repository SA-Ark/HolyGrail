import { deNormalize } from "../../../../store/utils";
import ItemCard from "../../../ItemsDisplayComponents/ItemCard";
import './FavoritesTab.css';

const FavoritesTab = ({favoriteItems}) => {

    const favoritesList = deNormalize(favoriteItems)

    console.log(favoritesList, 'FAVORITES!!!!')

    //!@#$ need liked items to come in as prop
    return (
        <div className="favorites-container">
            <div className="fav-card-container">
                {
                    favoritesList?.length
                        ? favoritesList.map((favoriteItem) => {
                            return <ItemCard classProp="fav-item-card" item={favoriteItem.item} key={favoriteItem.item.id}/>
                        })
                        : null
                }
            </div>
        </div>
    )
}

export default FavoritesTab;
