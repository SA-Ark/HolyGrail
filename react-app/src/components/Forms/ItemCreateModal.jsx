import React, { useState, useEffect } from 'react';
import { useModal } from "../../context/Modal";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { thunkCreateItem } from '../../store/items';
import './ItemCreateForm.css'

const ItemCreateModal = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [genderStyle, setGenderStyle] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [condition, setCondition] = useState('');
    const [categoryTags, setCategoryTags] = useState('');
    const [price, setPrice] = useState('');
    const [shippingCost, setShippingCost] = useState(10);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');
    const [imageUrl4, setImageUrl4] = useState('');
    
    const { closeModal } = useModal() 

    const user = useSelector(state => state.session?.user);
    const user_id = user?.id;
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
        imageUrl4,
        user_id]);


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
            user_id
        ]

        //! NEED TO ADD VALIDATION ERRORS

        //! needs validation for when price is 0

        const res = await dispatch(thunkCreateItem(itemsAttributes))
        if (res.ok) {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        }

        // //   .then(() => {
        // //     // history.push(`/items/${itemId}`)
        // // })
        // .catch(async (response) => {
        //   const data = await response.json()
        //   if (data.errors) setErrors([...data])
        // });

    }

    return (
        <>
            <div className='create-edit-page-wrapper'>
                <div className='create-edit-item-container'>
                    <form onSubmit={onSubmit} className="general-form">
                        <div>
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>

                        <div className='details details-cat'>
                            <label className='create-item-label'>Category</label>
                            <input
                                type='text'
                                placeholder='Department/Category'
                                name='category'
                                onChange={(e) => setCategoryTags(e.target.value)}
                                className="create-item-input"
                                value={categoryTags}
                            ></input>
                        </div>
                        <div className='details details-size'>
                            <label className='create-item-label'>Size</label>
                            <input
                                type='text'
                                placeholder='Size (Select category first)'
                                name='size'
                                onChange={(e) => setSize(e.target.value)}
                                className="create-item-input"
                                value={size}
                            ></input>
                        </div>

                        <div className='details details-item-name'>
                            <label className='create-item-label'>Item Name</label>
                            <input
                                type='text'
                                name='name'
                                placeholder='Item name'
                                onChange={(e) => setName(e.target.value)}
                                className="create-item-input"
                                value={name}
                            // required
                            ></input>
                        </div>

                        <div className='details details-color'>
                            <label className='create-item-label'>Color</label>
                            <input
                                type='text'
                                placeholder='Color name, i.e. "Frozen Yellow"'
                                name='color'
                                onChange={(e) => setColor(e.target.value)}
                                className="create-item-input"
                                value={color}
                            ></input>
                        </div>
                        <div className='details details-condition'>
                            <label className='create-item-label'>Condition</label>
                            <input
                                type='text'
                                name='condition'
                                onChange={(e) => setCondition(e.target.value)}
                                value={condition}
                                className="create-item-input"
                            ></input>
                        </div>
                        <div className='details details-price'>
                            <label className='create-item-label'>Price</label>
                            <input
                                type='integer'
                                placeholder='Price (USD)'
                                name='price'
                                onChange={(e) => setPrice(e.target.value)}
                                className="create-item-input"
                                value={price}
                            ></input>
                        </div>
                        <div className='details details-desc'>
                            <label for="textbox">Description</label>
                            <textarea
                                className='create-edit-form-textarea'
                                type='textarea'
                                placeholder='
            Add details about condition, how the garment fits, additional measurements, shipping policies, retail price, link to retail page, etc'
                                name='description'
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            ></textarea>
                        </div>
                        <div className='details details-shipping'>
                            <label className='create-item-label'>Shipping Cost</label>
                            <input
                                type='integer'
                                name='shipping_cost'
                                onChange={(e) => setShippingCost(e.target.value)}
                                value={shippingCost}
                                className="create-item-input"
                            ></input>
                        </div>
                        <div className='details details-gender'>
                            <label className='create-item-label'>Gender Style</label>
                            <input
                                type='text'
                                name='gender_style'
                                onChange={(e) => setGenderStyle(e.target.value)}
                                value={genderStyle}
                                className="create-item-input"
                            ></input>
                        </div>
                        <div className='details details-preview-url'>
                            <label className='create-item-label'>Preview Image</label>
                            <input
                                type='text'
                                name='preview_url'
                                onChange={(e) => setPreviewUrl(e.target.value)}
                                value={previewUrl}
                                className="create-item-input"
                            ></input>
                        </div>
                        <div className='details details-image-url'>
                            <label className='create-item-label'>Image Url 1</label>
                            <input
                                type='text'
                                name='image_url_1'
                                onChange={(e) => setImageUrl1(e.target.value)}
                                value={imageUrl1}
                                className="create-item-input"
                            ></input>
                        </div>
                        <div className='details details-image-url'>
                            <label className='create-item-label'>Image Url 2</label>
                            <input
                                type='text'
                                name='image_url_2'
                                onChange={(e) => setImageUrl2(e.target.value)}
                                value={imageUrl2}
                                className="create-item-input"
                            ></input>
                        </div>
                        <div className='details details-image-url'>
                            <label className='create-item-label'>Image Url 3</label>
                            <input
                                type='text'
                                name='image_url_3'
                                onChange={(e) => setImageUrl3(e.target.value)}
                                value={imageUrl3}
                                className="create-item-input"
                            ></input>
                        </div>
                        <div className='details details-image-url'>
                            <label className='create-item-label'>Image Url 4</label>
                            <input
                                type='text'
                                name='image_url_4'
                                onChange={(e) => setImageUrl4(e.target.value)}
                                value={imageUrl4}
                                className="create-item-input"
                            ></input>
                        </div>
                        <button className='create-item-button' type='submit'>List Item</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ItemCreateModal;