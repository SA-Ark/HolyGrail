
import { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";

const AddListing = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [size, setSize] = useState('')
    const [gender, setGender] = useState('')
    const [color, setColor] = useState('')
    const [condition, setCondition] = useState('')
    const [categories, setCategories] = useState('')
    const [price, setPrice] = useState('')
    const [shippingCost, setShippingCost] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [formErrors, setErrors] = useState([])

    const { itemId } = useParams()

    // useEffect(() => {
    //     const formErrors = [];
    //     if (!size) formErrors.push('Size is required!');
    //     if (!gender) formErrors.push('Gender is required!');
    //     if (!color) formErrors.push('Color is required!');
    //     if (!condition) formErrors.push('Condition is required!');
    //     if (!categories) formErrors.push('Categories is required!');
    //     if (!price) formErrors.push('price is required!');
    //     if (!shippingCost) formErrors.push('Shipping cost is required!');
    //     if (!imageUrl) formErrors.push('Please enter an image url for your spot!');
    //     setErrors(formErrors);
    // }, [size, gender, color, condition, categories, price, shippingCost, imageUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
            await dispatch(
                thunkCreateItem(
                    size,
                    gender,
                    color,
                    condition,
                    categories,
                    price,
                    shippingCost,
                    imageUrl
                ),
                
            )
            .then(() => {
                history.pushState(`/items/${itemId}`)
            })
            .catch(async (res) => {
                const response = await res.json()
                if (response.errors) setErrors([...response])
            })
    }
}

export default AddListing;



