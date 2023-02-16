import React from 'react';
import { useModal } from '../../context/Modal';
import ItemCreateModal from '../Forms/ItemCreateModal';
import PurchaseForm from '../Forms/PurchaseForm';

function PurchaseModal({
  item,
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onPurchaseClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<PurchaseForm item={item}/>);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      <button onClick={onPurchaseClick} className='purchase-button'>PURCHASE</button>
    </>
  );
}

export default PurchaseModal;
