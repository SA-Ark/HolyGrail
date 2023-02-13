import React, { useEffect, useState, } from 'react';
import './HomePage.css';
import ItemCard from '../../ItemsDisplayComponents/ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import * as utils from '../../../store/utils'
import { thunkLoadItems } from '../../../store/items';

const SplashPlage = () => {
    const dispatch = useDispatch()
    const [videoPlaying, setVideoPlaying] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndexDeals, setCurrentIndexDeals] = useState(0);


    // const items = utils.deNormalize(useSelector(store => store.items.allItems))
    const user = useSelector(store => store.session?.user)

    const items = useSelector((state) => state.items.allItems)

    useEffect(() => {
        dispatch(thunkLoadItems(user?.id))
    }, [dispatch, user])

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

    const itemCards = Object.values(items).slice(currentIndex, currentIndex + 5).map(item => {

        return (
            <ItemCard key={item.id} item={item} />
        )
    })

    const dealCards = Object.values(items)
        .filter(item => item.price < 100)
        .slice(currentIndexDeals, currentIndexDeals + 5)
        .map(item => {
            return (
                <ItemCard key={item.id} item={item} />
            )
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
            </div>

            <div className='splash-carousel-wrapper'>
                <div className='splash-carousel-container'>
                    <div className='staff-picks'>
                        <div className='arrow prev' onClick={handlePrev}></div>
                        <div className='carousel-item-container'>
                            {itemCards.length > 0 ? itemCards : null}
                        </div>
                        <div className='arrow next' onClick={handleNext}></div>
                    </div>
                </div>

                <div className='splash-carousel-container'>
                <h2 className='deals-text'> Deals: Under $100 </h2>
                    <div className='deals'>

                        <div className='arrow prev' onClick={handlePrevDeals}></div>
                        <div className='carousel-item-container'>
                            {dealCards.length > 0 ? dealCards : null}
                        </div>
                        <div className='arrow next' onClick={handleNextDeals}></div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default SplashPlage;



