import React, { useState, useEffect, useRef } from 'react';
import { useModal } from "../../context/Modal";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { thunkLoadSingleItem, thunkEditItem } from '../../store/items';

const ItemEditForm = () => {
    const { closeModal } = useModal()

    const dispatch = useDispatch();
    const { itemId } = useParams();

    const item = useSelector(state => state.items?.singleItem)
    const user = useSelector(state => state.session?.user)
    const userId = user?.id
    const history = useHistory()
    const errorRef = useRef(null);

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

    // const [genderStyle, setGenderStyle] = useState(item?.gender_style);
    // const [size, setSize] = useState(item?.size);
    // const [color, setColor] = useState(item?.color);
    // const [condition, setCondition] = useState(item?.condition);
    // const [categoryTags, setCategoryTags] = useState(item?.category_tag);
    // const [price, setPrice] = useState(item?.price);
    // const [shippingCost, setShippingCost] = useState(item?.shippingCost);
    // const [description, setDescription] = useState(item?.description);
    // const [name, setName] = useState(item?.name);
    // const [previewUrl, setPreviewUrl] = useState(item?.preview_url);
    // const [imageUrl1, setImageUrl1] = useState(item?.image_url_1);
    // const [imageUrl2, setImageUrl2] = useState(item?.image_url_2);
    // const [imageUrl3, setImageUrl3] = useState(item?.image_url_3);
    // const [imageUrl4, setImageUrl4] = useState(item?.image_url_4);
    console.log('itemmmmmmmmm', item)
    useEffect(() => {
        dispatch(thunkLoadSingleItem(item?.id, userId))
    }, [dispatch, userId])

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

    const categorySizes = {
        tops: ['XS', 'S', 'M', 'L', 'XL'],
        bottoms: ['XS', 'S', 'M', 'L', 'XL'],
        footwear: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        outerwear: ['XS', 'S', 'M', 'L', 'XL'],
        tailoring: ['XS', 'S', 'M', 'L', 'XL'],
        // accessories: ['Glasses', 'Gloves & Scarves', 'Hats', 'Jewelry & Watches', 'Wallets', 'Sunglasses', "Socks & Underwear"]
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        const itemsAttributes = {
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
            itemId: item.id,
            userId
        }

        const data = await dispatch(thunkEditItem(itemsAttributes))
        if (data && data.errors) {
            console.log('editform data', data)
            setErrors(data.errors)
            errorRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
            history.push(`/dashboard/${user.id}`)
            closeModal()
        }

    }

    return (
        <>
            <div className='create-edit-page-wrapper'>
                <h1 className="modal-title"> Edit your item</h1>
                <div className='create-edit-item-container'>
                    <form onSubmit={onSubmit} className="listing-edit-form">
                    <div ref={errorRef}>
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
                                    onChange={(e) => setSize(e.target.value)}
                                    className="create-edit-item-input"
                                    value={size}
                                >
                                    <option value=''>Select size</option>
                                    {categorySizes[categoryTags] && categorySizes[categoryTags].map((sizeOption, index) => (
                                        <option key={index} value={sizeOption}>{sizeOption}</option>
                                    ))}
                                    {!categorySizes[categoryTags] && <option value=''>Not applicable</option>}
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
                                <input
                                    required
                                    placeholder='Gender Style'
                                    type='text'
                                    name='gender_style'
                                    onChange={(e) => setGenderStyle(e.target.value)}
                                    value={genderStyle}
                                    className="create-edit-item-input"
                                ></input>
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
                            <label className='create-edit-item-label'>Image Url 1
                                <input
                                    placeholder='Optional Image'
                                    type='text'
                                    name='image_url_1'
                                    onChange={(e) => setImageUrl1(e.target.value)}
                                    value={imageUrl1}
                                    className="create-edit-item-input"
                                ></input>
                            </label>
                            <label className='create-edit-item-label'>Image Url 2
                                <input
                                    placeholder='Optional Image'
                                    type='text'
                                    name='image_url_2'
                                    onChange={(e) => setImageUrl2(e.target.value)}
                                    value={imageUrl2}
                                    className="create-edit-item-input"
                                ></input>
                            </label>
                            <label className='create-edit-item-label'>Image Url 3
                                <input
                                    placeholder='Optional Image'
                                    type='text'
                                    name='image_url_3'
                                    onChange={(e) => setImageUrl3(e.target.value)}
                                    value={imageUrl3}
                                    className="create-edit-item-input"
                                ></input>
                            </label>
                            <label className='create-edit-item-label'>Image Url 4
                                <input
                                    placeholder='Optional Image'
                                    type='text'
                                    name='image_url_4'
                                    onChange={(e) => setImageUrl4(e.target.value)}
                                    value={imageUrl4}
                                    className="create-edit-item-input"
                                ></input>
                            </label>
                        </div>
                        <button className='create-edit-item-button' type='submit'>EDIT ITEM</button>
                    </form>
                </div>
            </div >
        </>
    );
};

export default ItemEditForm
