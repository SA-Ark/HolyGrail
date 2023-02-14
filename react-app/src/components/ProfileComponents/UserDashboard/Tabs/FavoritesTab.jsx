import { deNormalize } from "../../../../store/utils";
import ItemCard from "../../../ItemsDisplayComponents/ItemCard";

const FavoritesTab = ({favoriteItems}) => {
    // console.log(items, "items")
    const favoritesList = deNormalize(favoriteItems)

    //!@#$ need liked items to come in as prop
    return (
        <div className="favorites-container">
            <div className="title">
                Favorites Tab
                {
                    favoritesList?.length
                        ? favoritesList.map((favoriteItem) => {
                            console.log(favoriteItem, "favoriteItem")
                            return <ItemCard item={favoriteItem.item} key={favoriteItem.item.id}/>
                        })
                        : null
                }
            </div>
        </div>
    )
}

export default FavoritesTab;
