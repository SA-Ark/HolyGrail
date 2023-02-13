import React from 'react';
import { useModal } from '../../context/Modal';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function OpenModalButton({
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onLoginClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<LoginFormModal/>);
    if (onButtonClick) onButtonClick();
  };

  const onSignupClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<SignupFormModal/>);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
    <button onClick={onLoginClick} className='nav-login-button'>Login</button>
    <button onClick={onSignupClick} className='nav-signup-button'>Sign Up</button>
    </>
  );
}

export default OpenModalButton;
