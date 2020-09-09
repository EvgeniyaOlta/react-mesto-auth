import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) { 
  const imgLinkRef = React.useRef();
  const imgNameRef = React.useRef();
  
  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(imgNameRef.current.value, imgLinkRef.current.value);
  }

  return (
    <PopupWithForm name="newplace" title="Новое место" isOpen={props.isOpen} onClose={props.onClose}>
      <input ref={imgNameRef} id="place-input" type="text" className="popup__input" name="name" placeholder="Название" required minLength="1" maxLength="30" /> 
      <span id="place-input-error" className="popup__input-error"></span>
      <input ref={imgLinkRef} id="link-input" type="url" className="popup__input" name="link" placeholder="Ссылка на картинку" required /> 
      <span id="link-input-error" className="popup__input-error"></span>
      <button type="submit" className="popup__save-button popup__save-button_active" onClick={handleSubmit}>Создать</button> 
    </PopupWithForm> 
  );
}

export default AddPlacePopup;
