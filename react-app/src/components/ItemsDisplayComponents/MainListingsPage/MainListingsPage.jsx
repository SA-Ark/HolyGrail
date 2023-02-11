import ItemCard from '../ItemCard'
import './MainListingsPage.css'
import { thunkLoadItems } from '../../../store/items'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as utils from '../../../store/utils'

const MainListingsPage = () => {
    const dispatch = useDispatch()
    const items = utils.deNormalize(useSelector(store => store.items.allItems))
    const user = useSelector(store=> store.session?.user)
    useEffect(() => {
        dispatch(thunkLoadItems(user?.id))
    }, [dispatch, user])

    return (
        <div className="items-display-container">
            {
                items.length
                    ? items.map(item => <ItemCard item={item} key={item.id} />)
                    : null
            }
        </div>
    )
}

export default MainListingsPage
