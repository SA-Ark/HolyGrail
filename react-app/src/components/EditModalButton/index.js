import React from 'react';
import { useModal } from '../../context/Modal';
import ItemEditForm from '../Forms/ItemEditForm';
import './EditItem.css'

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
    <button onClick={onSellClick} className='edit-item-button'>EDIT</button>
    </>
  );
}

export default CreateModalButton;
