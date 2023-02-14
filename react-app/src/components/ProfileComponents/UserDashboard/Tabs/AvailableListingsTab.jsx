import { useState } from "react";
import { useParams } from "react-router-dom";
import MultiSelect from "multiselect-react-dropdown";
import ItemCard from '../../../ItemsDisplayComponents/ItemCard';
import { deNormalize, getUserItems } from "../../../../store/utils";


const AvailableListingsTab = ({ items }) => {

    const {userId} = useParams()
    const [department, setDepartment] = useState(["Menswear", "Womenswear"]);
    const [category, setCategory] = useState(["Tops", "Bottoms", "Outerwear", "Footwear"]);
    const [size, setSize] = useState(["XS", "S", "M", "L", "XL"])
    const [price, setPrice] = useState(["Min", "Max"]);
    const [condition, setCondition] = useState(["Worn", "Used", "Gently Used", "New/Never Worn"]);
    const [itemsList, setItemsList] = useState(items)


    const userItems = getUserItems(deNormalize(items), userId)

    return (
        <div className="listings-tab-container">
            <h1>Hello From listings tab</h1>
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

                <br />
                <br />
                <br />

                {/*

                <label for="department-filter">Department:</label>
                <MultiSelect
                    name="department-filter"
                    isObject={false}
                    onRemove={(e) => {console.log(e)} }
                    onSelect={(e) => {console.log(e)} }
                    options={department}
                    showCheckbox
                />

                <br />

                <label for="category-filter">Category:</label>
                <MultiSelect
                    name="category-filter"
                    isObject={false}
                    onRemove={(e) => {console.log(e)} }
                    onSelect={(e) => {console.log(e)} }
                    options={category}
                    showCheckbox
                />

                <br />

                <label for="size-filter">Size:</label>
                <MultiSelect
                    name="size-filter"
                    isObject={false}
                    onRemove={(e) => {console.log(e)} }
                    onSelect={(e) => {console.log(e)} }
                    options={size}
                    showCheckbox
                />

                <br />

                <label for="price-filter">Price:</label>
                <MultiSelect
                    name="price-filter"
                    isObject={false}
                    onRemove={(e) => {console.log(e)} }
                    onSelect={(e) => {console.log(e)} }
                    options={price}
                    showCheckbox
                />

                <br />

                <label for="condition-filter">Condition:</label>
                <MultiSelect
                    name="condition-filter"
                    isObject={false}
                    onRemove={(e) => {console.log(e)} }
                    onSelect={(e) => {console.log(e)} }
                    options={condition}
                    showCheckbox
                />

                */}
            </div>
            <div className="listings-container">
                {
                    userItems?.length
                    ? userItems.map(item => {
                        return <ItemCard item={item} key={item.id}/>
                    })
                    : null
                }
            </div>
        </div>
    )
}
export default AvailableListingsTab;
