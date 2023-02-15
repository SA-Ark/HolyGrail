import React from 'react';
import { useModal } from '../../context/Modal';
import ItemCreateModal from '../Forms/ItemCreateModal';
import ReviewForm from '../Forms/ReviewForm';

function CreateModalButton({
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onReviewClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<ReviewForm />);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      <button onClick={onReviewClick} className='sell-button'>Leave Feedback</button>
    </>
  );
}

export default CreateModalButton;
