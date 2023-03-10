import React from 'react';
import { useModal } from '../../context/Modal';
import CreateReviewForm from '../Forms/CreateReviewForm';
import "./CreateReviewModal.css";

function CreateReviewModal({
  prevReview,
  setPrevReview,
  itemId,
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed,

}) {
  const { setModalContent, setOnModalClose } = useModal();
  const onReviewClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<CreateReviewForm prevReview={prevReview} setPrevReview={setPrevReview} itemId={itemId} />);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      <button onClick={onReviewClick} className='feedback-button'>Leave Feedback</button>
    </>
  );
}

export default CreateReviewModal;
