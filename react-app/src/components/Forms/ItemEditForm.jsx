import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { thunkLoadSingleItem, thunkEditItem } from '../../store/items';

const ItemEditForm = () => {
    const { itemId } = useParams()
    const dispatch = useDispatch();

    const item = useSelector(state => state.items?.singleItem)
    const user = useSelector(state => state.session?.user)
    const userId = user?.id

    const [errors, setErrors] = useState([]);
    const [genderStyle, setGenderStyle] = useState(item.gender_style);
    const [size, setSize] = useState(item.size);
    const [color, setColor] = useState(item.color);
    const [condition, setCondition] = useState(item.condition);
    const [categoryTags, setCategoryTags] = useState(item.category_tag);
    const [price, setPrice] = useState(item.price);
    const [shippingCost, setShippingCost] = useState(item.shippingCost);
    const [description, setDescription] = useState(item.description);
    const [name, setName] = useState(item.name);
    const [previewUrl, setPreviewUrl] = useState(item.preview_url);
    const [imageUrl1, setImageUrl1] = useState(item.image_url_1);
    const [imageUrl2, setImageUrl2] = useState(item.image_url_2);
    const [imageUrl3, setImageUrl3] = useState(item.image_url_3);
    const [imageUrl4, setImageUrl4] = useState(item.image_url_4);

    useEffect(() => {
        console.log(itemId, '<---- ITEM ID IN EDIT FORM')
        dispatch(thunkLoadSingleItem(itemId, userId))
    }, [dispatch, itemId, userId])

    // const item = useSelector((state) => state.items.singleItem)
    //! NEED TO MAKE WE REDIRECT TO ITEM.ID <-----------------

    useEffect(() => {
        const formErrors = [];
        // if (!genderStyle) formErrors.push('Gender is required!');
        // if (!size) formErrors.push('Size is required!');
        // if (!color) formErrors.push('Color is required!');
        // if (!condition) formErrors.push('Condition is required!');
        // if (!categoryTags) formErrors.push('Categories is required!');
        // if (!price) formErrors.push('price is required!');
        // if (!shippingCost) formErrors.push('Shipping cost is required!');
        // if (!description) formErrors.push('Description is required!');
        // if (!name) formErrors.push('Name is required!');
        // if (!previewUrl) formErrors.push('Please enter a preview image for your item!');
        // setErrors(formErrors);
    }, [genderStyle,
        size,
        color,
        condition,
        categoryTags,
        price,
        shippingCost,
        description,
        name,
        previewUrl,
        imageUrl1,
        imageUrl2,
        imageUrl3,
        imageUrl4
    ]);


    const onSubmit = async (e) => {
        const formErrors = [];
        if (!genderStyle) formErrors.push('Gender is required!');
        if (!size) formErrors.push('Size is required!');
        if (!color) formErrors.push('Color is required!');
        if (!condition) formErrors.push('Condition is required!');
        if (!categoryTags) formErrors.push('Categories is required!');
        if (!price) formErrors.push('price is required!');
        if (!shippingCost) formErrors.push('Shipping cost is required!');
        if (!description) formErrors.push('Description is required!');
        if (!name) formErrors.push('Name is required!');
        if (!previewUrl) formErrors.push('Please enter a preview image for your item!');

        e.preventDefault();
        setErrors([formErrors])
        const itemsAttributes = [
            genderStyle,
            size,
            color,
            condition,
            categoryTags,
            price,
            shippingCost,
            description,
            name,
            previewUrl,
            imageUrl1,
            imageUrl2,
            imageUrl3,
            imageUrl4,
            itemId,
            userId
        ]

        //! NEED TO ADD VALIDATION ERRORS

        return await dispatch(thunkEditItem(itemsAttributes))
        // //   .then(() => {
        // //     // history.push(`/items/${itemId}`)
        // // })
        // .catch(async (response) => {
        //   const data = await response.json()
        //   if (data.errors) setErrors([...data])
        // });

    }

    return (
        <form onSubmit={onSubmit} className="general-form">
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label>Item Name</label>
                <input
                    type='text'
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                // required
                ></input>
            </div>
            <div>
                <label>Size</label>
                <input
                    type='text'
                    name='size'
                    onChange={(e) => setSize(e.target.value)}
                    value={size}
                ></input>
            </div>
            <div>
                <label>Color</label>
                <input
                    type='text'
                    name='color'
                    onChange={(e) => setColor(e.target.value)}
                    value={color}
                ></input>
            </div>
            <div>
                <label>Condition</label>
                <input
                    type='text'
                    name='condition'
                    onChange={(e) => setCondition(e.target.value)}
                    value={condition}
                ></input>
            </div>
            <div>
                <label>Category</label>
                <input
                    type='text'
                    name='category'
                    onChange={(e) => setCategoryTags(e.target.value)}
                    value={categoryTags}
                ></input>
            </div>
            <div>
                <label>Price</label>
                <input
                    type='integer'
                    name='price'
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                ></input>
            </div>
            <div>
                <label>Description</label>
                <input
                    type='textarea'
                    name='description'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></input>
            </div>
            <div>
                <label>Shipping Cost</label>
                <input
                    type='integer'
                    name='shipping_cost'
                    onChange={(e) => setShippingCost(e.target.value)}
                    value={shippingCost}
                ></input>
            </div>
            <div>
                <label>Gender Style</label>
                <input
                    type='text'
                    name='gender_style'
                    onChange={(e) => setGenderStyle(e.target.value)}
                    value={genderStyle}
                ></input>
            </div>
            <div>
                <label>Preview Image</label>
                <input
                    type='text'
                    name='preview_url'
                    onChange={(e) => setPreviewUrl(e.target.value)}
                    value={previewUrl}
                ></input>
            </div>
            <div>
                <label>Image Url 1</label>
                <input
                    type='text'
                    name='image_url_1'
                    onChange={(e) => setImageUrl1(e.target.value)}
                    value={imageUrl1}
                ></input>
            </div>
            <div>
                <label>Image Url 2</label>
                <input
                    type='text'
                    name='image_url_2'
                    onChange={(e) => setImageUrl2(e.target.value)}
                    value={imageUrl2}
                ></input>
            </div>
            <div>
                <label>Image Url 3</label>
                <input
                    type='text'
                    name='image_url_3'
                    onChange={(e) => setImageUrl3(e.target.value)}
                    value={imageUrl3}
                ></input>
            </div>
            <div>
                <label>Image Url 4</label>
                <input
                    type='text'
                    name='image_url_4'
                    onChange={(e) => setImageUrl4(e.target.value)}
                    value={imageUrl4}
                ></input>
            </div>
            <button type='submit'>List Item</button>
        </form>
    );
};

export default ItemEditForm
