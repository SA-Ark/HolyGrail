import React from 'react';
import { useModal } from '../../../context/Modal';
import EditReviewForm from '../Forms/EditReviewForm'

function CreateModalButton({
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onReviewClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<EditReviewForm />);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      <button onClick={onReviewClick} className='sell-button'>Edit Feedback</button>
    </>
  );
}

export default CreateModalButton;
