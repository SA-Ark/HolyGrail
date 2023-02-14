import React from 'react';
import { useModal } from '../../context/Modal';
import ItemCreateModal from '../Forms/ItemCreateModal';
import ItemEditForm from '../Forms/ItemEditForm';

function CreateModalButton({
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onSellClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<ItemEditForm/>);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
    <button onClick={onSellClick} className='nav-sell-button'>EDIT</button>
    </>
  );
}

export default CreateModalButton;
