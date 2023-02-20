import React, { useState, useEffect, useRef } from 'react';
import { useModal } from "../../context/Modal";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect, useParams } from 'react-router-dom';
import { thunkCreateItem, thunkLoadItems } from '../../store/items';
import './ItemCreateModal.css'


const ItemCreateModal = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [genderStyle, setGenderStyle] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [condition, setCondition] = useState('');
    const [categoryTags, setCategoryTags] = useState('');
    const [price, setPrice] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');
    const [imageUrl4, setImageUrl4] = useState('');
    const [disabled, setDisabled] = useState(true)

    const { closeModal } = useModal()
    const history = useHistory()

    const user = useSelector(state => state.session?.user);
    const userId = user?.id;
    const item = useSelector((state) => state.items?.singleItem)
    const errorRef = useRef(null);

    useEffect(() => {
        if (categoryTags) setDisabled(false)
        if (!categoryTags.length) setDisabled(true)
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        const user_id = userId;
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

        const data = await dispatch(thunkCreateItem(itemsAttributes))
        if (data && data.errors) {
            setErrors(data.errors)
            errorRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
            closeModal()
            history.push(`/available-listings/${userId}`)
            await dispatch(thunkLoadItems(userId))
        }
    }

    const categorySizes = {
        tops: ['XS', 'S', 'M', 'L', 'XL'],
        bottoms: ['XS', 'S', 'M', 'L', 'XL'],
        footwear: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        outerwear: ['XS', 'S', 'M', 'L', 'XL'],
        tailoring: ['XS', 'S', 'M', 'L', 'XL'],
        // accessories: ['Glasses', 'Gloves & Scarves', 'Hats', 'Jewelry & Watches', 'Wallets', 'Sunglasses', "Socks & Underwear"]
    }

    return (
        <>
            <div className='create-edit-page-wrapper'>
                <h1 ref={errorRef} className="modal-title">List your item</h1>
                <div className='create-edit-item-container'>
                    <form onSubmit={onSubmit} className="listing-edit-form">
                    <div >
                            {Object.values(errors).length > 0 && (
                                <div className="error-messages">
                                    {Object.values(errors).map((error, ind) => (
                                        <div key={ind}>
                                            {error}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='create-edit-label-container'>
                            <label className='create-edit-item-label'>
                                <span className='create-edit-label-text'>Category</span>
                                <select
                                    required
                                    name='category'
                                    onChange={(e) => setCategoryTags(e.target.value)}
                                    className="create-edit-item-input"
                                    value={categoryTags}
                                >
                                    <option value=''>Select a category</option>
                                    <option value='tops'>Tops</option>
                                    <option value='bottoms'>Bottoms</option>
                                    <option value='footwear'>Footwear</option>
                                    <option value='outerwear'>Outerwear</option>
                                    <option value='tailoring'>Tailoring</option>
                                    {/* <option value='accessories'>Accessories</option> */}
                                </select>
                            </label>
                            <label className='create-edit-item-label'>
                                <span className='create-edit-label-text'>Size</span>
                                <select
                                    required
                                    name='size'
                                    disabled={disabled}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="create-edit-item-input"
                                    value={size}
                                >
                                    <option value=''>{disabled ? 'Not applicable' : 'Select Size'}</option>
                                    {categorySizes[categoryTags] && categorySizes[categoryTags].map((sizeOption, index) => (
                                        <option key={index} value={sizeOption}>{sizeOption}</option>
                                    ))}
                                </select>
                            </label>
                            <label className='create-edit-item-label'>
                                <span className='create-edit-label-text'>Item Name</span>
                                <input
                                    required
                                    type='text'
                                    name='name'
                                    placeholder='Item name'
                                    onChange={(e) => setName(e.target.value)}
                                    className="create-edit-item-input"
                                    value={name}
                                // required
                                ></input>
                            </label>

                            <label className='create-edit-item-label'>
                                <span className='create-edit-label-text'>Color</span>
                                <input
                                    required
                                    type='text'
                                    placeholder='Color name, i.e. "Frozen Yellow"'
                                    name='color'
                                    onChange={(e) => setColor(e.target.value)}
                                    className="create-edit-item-input"
                                    value={color}
                                ></input>
                            </label>
                            <label className='create-edit-item-label'>Condition
                                <select
                                    required
                                    type='text'
                                    name='condition'
                                    onChange={(e) => setCondition(e.target.value)}
                                    value={condition}
                                    className="create-edit-item-input">
                                    <option value=''>Select a condition</option>
                                    <option >New/Never Worn </option>
                                    <option >Gently Used</option>
                                    <option >Used</option>
                                    <option >Very Worn</option>
                                </select>
                            </label>
                            <label className='create-edit-item-label'>Price
                                <input
                                    required
                                    type='integer'
                                    placeholder='Price (USD)'
                                    name='price'
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="create-edit-item-input"
                                    value={price}
                                ></input>
                            </label>
                            <label className='create-edit-item-label'>Description
                                <textarea
                                    className='create-edit-edit-form-textarea'
                                    type='textarea'
                                    placeholder='Add details about condition, how the garment fits, additional measurements, shipping policies, retail price, link to retail page, etc'
                                    name='description'
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                ></textarea>
                            </label>
                            <label className='create-edit-item-label'>Shipping Cost
                                <input
                                    required
                                    type='integer'
                                    name='shipping_cost'
                                    onChange={(e) => setShippingCost(e.target.value)}
                                    value={shippingCost}
                                    className="create-edit-item-input"
                                ></input>
                            </label>
                            <label className='create-edit-item-label'>Gender Style
                                <select
                                    required
                                    placeholder='Gender Style'
                                    type='text'
                                    name='gender_style'
                                    onChange={(e) => setGenderStyle(e.target.value)}
                                    value={genderStyle}
                                    className="create-edit-item-input"
                                >
                                    <option value=''>Gender Style</option>
									<option>M</option>
									<option>F</option>
                                </select>

									


                            </label>
                            <label className='create-edit-item-label'>Preview Image
                                <input
                                    required
                                    placeholder='Preview Image'
                                    type='text'
                                    name='preview_url'
                                    onChange={(e) => setPreviewUrl(e.target.value)}
                                    value={previewUrl}
                                    className="create-edit-item-input"
                                ></input>
                            </label>
                            <label className='create-edit-item-label'> Optional Image
                                <input
                                    placeholder='Image url'
                                    type='text'
                                    name='image_url_1'
                                    onChange={(e) => setImageUrl1(e.target.value)}
                                    value={imageUrl1}
                                    className="create-edit-item-input"
                                ></input>
                            </label>
                            <label className='create-edit-item-label'> Optional Image
                                <input
                                    placeholder='Image url'
                                    type='text'
                                    name='image_url_2'
                                    onChange={(e) => setImageUrl2(e.target.value)}
                                    value={imageUrl2}
                                    className="create-edit-item-input"
                                ></input>
                            </label>
                            <label className='create-edit-item-label'> Optional Image
                                <input
                                    placeholder='Image url'
                                    type='text'
                                    name='image_url_3'
                                    onChange={(e) => setImageUrl3(e.target.value)}
                                    value={imageUrl3}
                                    className="create-edit-item-input"
                                ></input>
                            </label>
                            <label className='create-edit-item-label'> Optional Image
                                <input
                                    placeholder='Image url'
                                    type='text'
                                    name='image_url_4'
                                    onChange={(e) => setImageUrl4(e.target.value)}
                                    value={imageUrl4}
                                    className="create-edit-item-input"
                                ></input>
                            </label>
                        </div>
                        <button className='create-edit-item-button' type='submit'>LIST ITEM</button>
                    </form>
                </div>
            </div >
        </>
    );
}

export default ItemCreateModal;
