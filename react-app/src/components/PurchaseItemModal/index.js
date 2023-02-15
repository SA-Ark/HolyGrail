import React from 'react';
import { useModal } from '../../context/Modal';
import PurchaseFrom from '../Forms/PurchaseForm'

function PurchItemModal({
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onPurchaseClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<PurchaseFrom/>);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
    <button onClick={onPurchaseClick} className='nav-sell-button'>EDIT</button>
    </>
  );
}

export default PurchItemModal;
