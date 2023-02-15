import React from 'react';
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal';


function RedirectToLoginModal({
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onRedirectClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<LoginFormModal />);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      <button className='like-button' onClick={onRedirectClick}>Like</button>
    </>
  );
}

export default RedirectToLoginModal;
