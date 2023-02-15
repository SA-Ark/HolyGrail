import React from 'react';
import { useModal } from '../../context/Modal';
import EditReviewForm from '../Forms/EditReviewForm';

function EditReviewModal({
  review, itemId, closeModal,
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onReviewClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<EditReviewForm closeModal={closeModal} review={review} itemId={itemId}/>);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      <button onClick={onReviewClick} className='sell-button'>Edit Feedback</button>
    </>
  );
}

export default EditReviewModal;
