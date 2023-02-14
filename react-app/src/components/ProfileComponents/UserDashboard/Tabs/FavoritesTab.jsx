import ItemCard from "../../../ItemsDisplayComponents/ItemCard";

const FavoritesTab = ({items}) => {

    //!@#$ need liked items to come in as prop

    return (
        <div className="favorites-container">
            <div className="title">
                Favorites Tab

                {
                    items?.length
                        ? items.map(item => {
                            return <ItemCard item={item}/>
                        })
                        : null
                }
            </div>
        </div>
    )

}

export default FavoritesTab;
