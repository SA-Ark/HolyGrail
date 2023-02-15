import ItemCard from '../ItemCard'
import './MainListingsPage.css'
import { thunkLoadItems } from '../../../store/items'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import MultiSelect from "multiselect-react-dropdown";
import * as utils from '../../../store/utils'

const MainListingsPage = () => {
    const dispatch = useDispatch()
    const items = utils.deNormalize(useSelector(store => store.items.allItems))
    const user = useSelector(store=> store.session?.user)
    useEffect(() => {
        dispatch(thunkLoadItems(user?.id))
    }, [dispatch, user])

    return (
        <>
            <div className="filters">
                <MultiSelect
                    placeholder="Search Filters"
                    displayValue="key"
                    groupBy="cat"
                    onRemove={(e) => {console.log(e)} }
                    onSelect={(e) => {console.log(e)} }
                    options={[
                        {
                            cat: "Department",
                            key: "Menswear"
                        },
                        {
                            cat: "Department",
                            key: "Womenswear"
                        },
                        {
                            cat: "Category",
                            key: "Tops"
                        },
                        {
                            cat: "Category",
                            key: "Bottoms"
                        },
                        {
                            cat: "Category",
                            key: "Outerwear"
                        },
                        {
                            cat: "Category",
                            key: "Footwear"
                        },
                        {
                            cat: "Size",
                            key: "XS"
                        },
                        {
                            cat: "Size",
                            key: "S"
                        },
                        {
                            cat: "Size",
                            key: "M"
                        },
                        {
                            cat: "Size",
                            key: "L"
                        },
                        {
                            cat: "Size",
                            key: "XL"
                        },
                        // INSERT PRICE HERE
                        {
                            cat: "Condition",
                            key: "Worn"
                        },
                        {
                            cat: "Condition",
                            key: "Used"
                        },
                        {
                            cat: "Condition",
                            key: "Gently Used"
                        },
                        {
                            cat: "Condition",
                            key: "New/Never Worn"
                        },
                    ]}
                    showCheckbox
                ></MultiSelect>
            </div>

            <br />

            <div className="items-display-container">
                {
                    items.length
                        ? items.map(item => <ItemCard item={item} key={item.id} />)
                        : null
                }
            </div>
        
        </>
    )
}

export default MainListingsPage
