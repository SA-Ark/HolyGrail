import React from 'react';
import { useModal } from '../../context/Modal';
import ItemCreateModal from '../Forms/ItemCreateModal';

function CreateModalButton({
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onSellClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<ItemCreateModal/>);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
    <button onClick={onSellClick} className='sell-button'>SELL</button>
    </>
  );
}

export default CreateModalButton;
