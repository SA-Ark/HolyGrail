import React from 'react';
import { useModal } from '../../context/Modal';
import EditReviewForm from '../Forms/EditReviewForm';

function CreateReviewModal({
  review, itemId,
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed,
  
}) {
  const { setModalContent, setOnModalClose } = useModal();
console.log('review',review)
console.log('itemId', itemId)
  const onReviewClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<EditReviewForm review={review} itemId={itemId}/>);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      <button onClick={onReviewClick} className='sell-button'>Leave Feedback</button>
    </>
  );
}

export default CreateReviewModal;
