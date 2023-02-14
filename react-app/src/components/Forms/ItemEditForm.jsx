import React, { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { thunkLoadSingleItem, thunkEditItem } from '../../store/items';

const ItemEditForm = () => {
    const { itemId } = useParams()
    const { closeModal } = useModal()

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

        const data = await dispatch(thunkEditItem(itemsAttributes))
        closeModal()
        return data
        // //   .then(() => {
        // //     // history.push(`/items/${itemId}`)
        // // })
        // .catch(async (response) => {
        //   const data = await response.json()
        //   if (data.errors) setErrors([...data])
        // });

    }

    return (
        <div className='create-edit-page-wrapper'>
            <h1 className="modal-title">Update your item</h1>
            <div className='create-edit-item-container'>

                <form onSubmit={onSubmit} className="listing-edit-form">
                    <div>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Category</span>
                            <input
                                type='text'
                                name='name'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            // required
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Size</span>
                            <input
                                type='text'
                                name='size'
                                onChange={(e) => setSize(e.target.value)}
                                value={size}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Item Name</span>
                            <input
                                type='text'
                                name='color'
                                onChange={(e) => setColor(e.target.value)}
                                value={color}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Color</span>
                            <input
                                type='text'
                                name='condition'
                                onChange={(e) => setCondition(e.target.value)}
                                value={condition}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Condition</span>
                            <input
                                type='text'
                                name='category'
                                onChange={(e) => setCategoryTags(e.target.value)}
                                value={categoryTags}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Price</span>
                            <input
                                type='integer'
                                name='price'
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Description</span>
                            <input
                                type='textarea'
                                name='description'
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Shipping Cost</span>
                            <input
                                type='integer'
                                name='shipping_cost'
                                onChange={(e) => setShippingCost(e.target.value)}
                                value={shippingCost}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Gender</span>
                            <input
                                type='text'
                                name='gender_style'
                                onChange={(e) => setGenderStyle(e.target.value)}
                                value={genderStyle}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Preview Image</span>

                            <input
                                type='text'
                                name='preview_url'
                                onChange={(e) => setPreviewUrl(e.target.value)}
                                value={previewUrl}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Image Url 1</span>
                            <input
                                type='text'
                                name='image_url_1'
                                onChange={(e) => setImageUrl1(e.target.value)}
                                value={imageUrl1}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Image Url 2</span>
                            <input
                                type='text'
                                name='image_url_2'
                                onChange={(e) => setImageUrl2(e.target.value)}
                                value={imageUrl2}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Image Url 3</span>
                            <input
                                type='text'
                                name='image_url_3'
                                onChange={(e) => setImageUrl3(e.target.value)}
                                value={imageUrl3}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label className='create-edit-item-label'>
                        <span className='create-edit-label-text'>Image Url 4</span>
                            <input
                                type='text'
                                name='image_url_4'
                                onChange={(e) => setImageUrl4(e.target.value)}
                                value={imageUrl4}
                            ></input>
                        </label>
                    </div>
                    <button type='submit'>EDIT ITEM</button>
                </form>
            </div>
        </div>
    );
};

export default ItemEditForm
