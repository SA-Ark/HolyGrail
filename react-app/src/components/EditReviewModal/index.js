import React from 'react';
import { useModal } from '../../context/Modal';
import EditReviewForm from '../Forms/EditReviewForm'

function EditReviewModal({
  prevReview,
  setPrevReview,
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onReviewClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<EditReviewForm prevReview={prevReview} setPrevReview={setPrevReview} />);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      <button onClick={onReviewClick} className='feedback-button'>Edit Feedback</button>
    </>
  );
}

export default EditReviewModal;
