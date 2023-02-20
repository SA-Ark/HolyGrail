import React, { useEffect, useState, } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLoadItems } from '../../../store/items';
import ItemCard from '../../ItemsDisplayComponents/ItemCard';
import * as utils from '../../../store/utils'
import './HomePage.css';

const SplashPlage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [videoPlaying, setVideoPlaying] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndexDeals, setCurrentIndexDeals] = useState(0);

    // const items = utils.deNormalize(useSelector(store => store.items.allItems))
    const user = useSelector(store => store.session?.user)
    const itemsState = useSelector((state) => state.items?.singleItem)
    const items = useSelector((state) => state.items.allItems)
    const [liked, setLiked] = useState("")
    console.log(useSelector(state => state.items.singleItem), "selector")
    // console.log('item ---->', items)

    useEffect(() => {
        dispatch(thunkLoadItems(user?.id))
    }, [dispatch, user])

    useEffect(() => {

        console.log(itemsState, "state update")
    }, [items])

    const handlePlay = () => {
        setVideoPlaying(true)
    }

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % 5)
    }

    const handlePrev = () => {
        setCurrentIndex((currentIndex + 4) % 5)
    }

    const handleNextDeals = () => {
        setCurrentIndexDeals((currentIndexDeals + 1) % 5)
    }

    const handlePrevDeals = () => {
        setCurrentIndexDeals((currentIndexDeals + 4) % 5)
    }

    const handleShopAll = () => {
        history.push('/items');
    }

    const handleShopMens = () => {
        history.push('/menswear');
    }

    const handleShopWomens = () => {
        history.push('/womenswear');
    }

    const mensFootwear = () => {
        history.push('/mensfootwear')
    }

    const itemCards = Object.values(items).slice(currentIndex, currentIndex + 5).map(item => {

        if (item?.seller_id !== user?.id) {
            return (<ItemCard classProp="splash-card-container" key={item.id} item={item} />)
        }
        return null
    })

    const dealCards = Object.values(items)
        .filter(item => item.price < 100)
        .slice(currentIndexDeals, currentIndexDeals + 5)
        .map(item => {

            if (item?.seller_id !== user?.id) {
                return (<ItemCard classProp="splash-card-container" key={item.id} item={item} />)
            }
            return null
        });

    return (
        <div className="splash-page-container">

            <div className="filters-bar"></div>

            <div className="splash-video-conatiner">
                <video
                    className='splash-page-video'
                    onClick={handlePlay}
                    src="https://videos.ctfassets.net/bdvz0u6oqffk/54rQSqwZvom9QIgOyXdgl0/623e6c0d17db25d687220a304fa9ce33/_DESKTOP_GRAILED-BRAND-REEL-1280x720px.mp4"
                    autoPlay
                    loop
                    playsInline
                ></video>

                <div className='splash-video-title'>
                    <h1>THE PLATFORM FOR PERSONAL STYLE</h1>
                </div>
                <div className='splash-video-text'>
                    Buy, sell, discover authenticated pieces from the world's top brands.
                </div>
                <div className='deparment-buttons-container'>
                    <button onClick={handleShopMens} className='mens-button'>SHOP MENSWEAR</button>
                    <button onClick={handleShopWomens} className='womens-button'> SHOP WOMENSWEAR</button>
                </div>
            </div>

            {/* <div className='splash-cat-tags'>
                <div className='mens-categories-container'>
                    <h3 className='mens-wear-title'>Shop Menwear</h3>
                    <div className='splash-mens-img-container'>
                        <div className='cat-img-container'>
                            <img
                                src='https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://process.fs.grailed.com/06SvTeIjQPSjzHvjtWdw'
                                className='mens-category-card'>
                            </img>
                            <span className='splash-cat-tag'>Footwear</span>
                        </div>
                        <div className='cat-img-container'>
                            <img
                                src='https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://process.fs.grailed.com/UwOQ2J4kRHqrTLK1kXaO'
                                className='mens-category-card'>
                            </img>
                            <span className='splash-cat-tag'>Outerwear</span>
                        </div>
                        <div className='cat-img-container'>
                            <img
                                src='https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://process.fs.grailed.com/6nmFOFtEQwKXWWMaD6zo'
                                className='mens-category-card'>
                            </img>
                            <span className='splash-cat-tag'>Tops</span>
                        </div>
                        <div className='cat-img-container'>
                            <img
                                src='https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://process.fs.grailed.com/PiJmCr4nSW5LuFMZjiqs'
                                className='mens-category-card'>
                            </img>
                            <span className='splash-cat-tag'>Bottoms</span>
                        </div>
                        <div className='cat-img-container'>
                            <img
                                src='https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://process.fs.grailed.com/b9R6HaddSpGIHBLHKMj5'
                                className='mens-category-card'>
                            </img>
                            <span className='splash-cat-tag'>Tailoring</span>
                        </div>
                        <div className='cat-img-container'>
                            <img
                                src='https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://process.fs.grailed.com/Q5bZd8hRTxKCC4dFa8ey'
                                className='mens-category-card'>
                            </img>
                            <span className='splash-cat-tag'>Accessories</span>
                        </div>
                    </div>
                </div>


                <div className='womens-categories-container'>
                    <h3 className='mens-wear-title'>Shop Menwear</h3>
                    <div className='splash-mens-img-container'>
                        <div className='cat-img-container'>
                            <img
                                src='https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/9YSJNnYRs2oDCltJU4Tw'
                                className='mens-category-card'>
                            </img>
                            <span className='splash-cat-tag'>Footwear</span>
                        </div>
                        <div className='cat-img-container'>
                            <img
                                src='https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/g8VWNIKDR2u8n634TQbB'
                                className='mens-category-card'>
                            </img>
                            <span className='splash-cat-tag'>Outerwear</span>
                        </div>
                        <div className='cat-img-container'>
                            <img
                                src='https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/0QggQRpQSvSKNs0ZizUw'
                                className='mens-category-card'>
                            </img>
                            <span className='splash-cat-tag'>Tops</span>
                        </div>
                        <div className='cat-img-container'>
                            <img
                                src='https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/e2dsRDsoSnchyoEejb9c'
                                className='mens-category-card'>
                            </img>
                            <span className='splash-cat-tag'>Bottoms</span>
                        </div>
                        <div className='cat-img-container'>
                            <img
                                src='https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/TlReBxcTRp6odCtiG5cp'
                                className='mens-category-card'>
                            </img>
                            <span className='splash-cat-tag'>Tailoring</span>
                        </div>
                        <div className='cat-img-container'>
                            <img
                                src='https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:70/compress/https://www.filepicker.io/api/file/3ZnFwXmmSdWuXRvGK67D'
                                className='mens-category-card'>
                            </img>
                            <span className='splash-cat-tag'>Accessories</span>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className='splash-carousels-wrapper'>
                <h3 className='deals-text'> Staff Picks </h3>
                <div className='splash-carousel-container'>
                    <div className='staff-picks'>
                        <button className='back-arrow icon-button' onClick={handlePrev}><i className="fa-solid fa-angles-left fa-3x"></i></button>
                        <div className='carousel-item-container'>
                            {itemCards.length > 0 ? itemCards : null}
                        </div>
                        <button className='next-arrow icon-button' onClick={handleNext}><i className="fa-solid fa-angles-right fa-3x"></i></button>
                    </div>
                </div>

                <h3 className='deals-text'> Deals: Under $100 </h3>
                <div className='splash-carousel-container'>
                    <div className='deals'>

                        <button className='back-arrow icon-button' onClick={handlePrevDeals}><i className="fa-solid fa-angles-left fa-3x"></i></button>
                        <div className='carousel-item-container'>
                            {dealCards.length > 0 ? dealCards : null}
                        </div>
                        <button className='next-arrow icon-button' onClick={handleNextDeals}><i className="fa-solid fa-angles-right fa-3x"></i></button>
                    </div>
                </div>
            </div>

            <div className='splash-bottom-container'>
                <img className='splash-bottom-img' src='https://images.ctfassets.net/bdvz0u6oqffk/5WKjwaqsg7qdf3NFcnrFc3/7a24b9c497e5112d64c0eba0cf3eee59/Womens_HPBanner.jpg?fm=webp'></img>
                <h1 className='splash-bottom-text'>The one-stop destination for buying, selling, and exploring fashion.</h1>
                <button onClick={handleShopAll} className='splash-bottom-button'>SHOP ALL</button>
            </div>
            {/* <div class='splash-footer-container'>
                <div class='footer-img-container'>
                    <p class='footer-name'>Steven Picazo</p>
                    <div class='footer-github'>
                        <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' class='github-img'></img>
                        <span class='github-text' onClick={() => window.open('https://github.com/stevenpicazo')}>
                            GitHub
                        </span>
                    </div>
                </div>
                <div class='footer-img-container'>
                    <p class='footer-name'>Arko Chakrabarty</p>
                    <div class='footer-github'>
                        <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' class='github-img'></img>
                        <span class='github-text' onClick={() => window.open('https://github.com/SA-Ark')}>
                            GitHub
                        </span>
                    </div>
                </div>
                <div class='footer-img-container'>
                    <p class='footer-name'>Joseph Dumas</p>
                    <div class='footer-github'>
                        <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' class='github-img'></img>
                        <span class='github-text' onClick={() => window.open('https://github.com/jdumas293')}>
                            GitHub
                        </span>
                    </div>
                </div>
                <div class='footer-img-container'>
                    <p class='footer-name'>Noraa Stoke</p>
                    <div class='footer-github'>
                        <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' class='github-img'></img>
                        <span class='github-text' onClick={() => window.open('https://github.com/noraa-july-stoke')}>
                            GitHub
                        </span>
                    </div>
                </div>
            </div> */}


        </div >
    )
}

export default SplashPlage;
