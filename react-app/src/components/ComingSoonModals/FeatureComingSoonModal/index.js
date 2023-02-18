import React from 'react';
import { useModal } from '../../../context/Modal';
import ComingSoonForm from './ComingSoon'

function FeatureComingSoonModal({
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onEditClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<ComingSoonForm/>);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      <button onClick={onEditClick} className='profile-edit feedback-button'>Edit Profile</button>
    </>
  );
}

export default FeatureComingSoonModal;
