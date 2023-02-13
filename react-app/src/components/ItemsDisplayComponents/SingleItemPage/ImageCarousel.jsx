
import { useState, useEffect } from 'react'
import * as utils from '../../../store/utils'

const ImageCarousel = ({ images }) => {

    const [xPos, setXPos] = useState(0)

    const [currentImage, setCurrentImage] = useState(null)
    const [imageContainerStyle, setimageContainerStyle] = useState({
        display: 'flex',
        height: 'fit-content',
        width: '5000%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '0px',
        transform: `translateX(${xPos}px)`
        // position: 'absolute',
    })

    const nonSequiturClick = null // logic coming soon
    const sequiturClick = null // logic coming soon
    const backClick = e => {
        setXPos(xPos - 100)
        setimageContainerStyle({
            ...imageContainerStyle,
            transform:`translateX(${xPos}px)`
        })
    }

    const forwardClick = e => {
        setXPos(xPos + 100)
        setimageContainerStyle({
            ...imageContainerStyle,
            transform: `translateX(${xPos}px)`
        })
    }

    const containerMaskStyle = {
        // height: 'fit-content',
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'center',
        width: '240px',
        overflow: 'hidden',
        // position: 'relative',


    }
    const largeImageStyle = {
        // height: '200px',
        // width: '100px',


    }
    // imageContainerStyle

    return (
        <div className="carousel-container">
            <span onClick={backClick} className="back-arrow">
                {'<'}
            </span>
            <div className="large-image-conatiner mask" style={containerMaskStyle}>
                {
                    images?.length
                        ? images.map(image => {
                            return (
                                    <div className='large-images' style={imageContainerStyle} >
                                        <img
                                            src={image.url}
                                            style={largeImageStyle}
                                            alt="product image"
                                            // key={utils.deNormalize(images).findIndex(image)}
                                            key={image.id}
                                            className="large-item-image">
                                        </img>
                                    </div>
                            )
                        })
                        : null
                }
            </div>
            <span onClick={forwardClick} className="forward-arrow">
                {'>'}
            </span>


        </div>
    )
}

export default ImageCarousel;
