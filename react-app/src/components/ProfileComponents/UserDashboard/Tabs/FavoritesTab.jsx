import { deNormalize } from "../../../../store/utils";
import ItemCard from "../../../ItemsDisplayComponents/ItemCard";

const FavoritesTab = ({favoriteItems}) => {
    const favoritesList = deNormalize(favoriteItems)
    console.log(favoritesList, 'FAVORITES!!!!')

    //!@#$ need liked items to come in as prop
    return (
        <div className="favorites-container">
            <div className="title">
                Favorites Tab
                {
                    favoritesList?.length
                        ? favoritesList.map((favoriteItem) => {
                            return <ItemCard item={favoriteItem.item} key={favoriteItem.item.id}/>
                        })
                        : null
                }
            </div>
        </div>
    )
}

export default FavoritesTab;
