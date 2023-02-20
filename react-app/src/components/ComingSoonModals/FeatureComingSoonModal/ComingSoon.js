import './ComingSoon.css'
import { useModal } from '../../../context/Modal'

const ComingSoon = () => {
    const { closeModal } = useModal()
    const handleClick = () => {
        closeModal()
    }
    
    return (
        <div className='coming-soon-container'>
            <h1 className="coming-soon">
                Feature Coming Soon!
            </h1>
            <button onClick={closeModal} className='return'>
                Return
            </button>
        </div>
    )
}

export default ComingSoon;