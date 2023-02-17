import { useState } from "react";
import { useParams } from "react-router-dom";
import MultiSelect from "multiselect-react-dropdown";
import ItemCard from '../../../ItemsDisplayComponents/ItemCard';
import { deNormalize, getUserItems } from "../../../../store/utils";
import './AvailableListingsTab.css';

const AvailableListingsTab = ({ items }) => {
    const {userId} = useParams()
    const [department, setDepartment] = useState(["Menswear", "Womenswear"]);
    const [category, setCategory] = useState(["Tops", "Bottoms", "Outerwear", "Footwear"]);
    const [size, setSize] = useState(["XS", "S", "M", "L", "XL"])
    const [price, setPrice] = useState(["Min", "Max"]);
    const [condition, setCondition] = useState(["Worn", "Used", "Gently Used", "New/Never Worn"]);
    const [itemsList, setItemsList] = useState(items)


    const userItemsAll = getUserItems(deNormalize(items), userId)
    const userItems = userItemsAll.filter(userItem => userItem.sold === false)

    return (
        <div className="listings-tab-container">
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
            <div className="listings-container">
                {
                    userItems?.length
                    ? userItems.map(item => {
                        return <ItemCard classProp="item-card-listings" item={item} key={item.id}/>
                    })
                    : null
                }
            </div>
        </div>
    )
}
export default AvailableListingsTab;
