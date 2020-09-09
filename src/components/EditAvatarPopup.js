import React from 'react';
import PopupWithForm from './PopupWithForm';
//import { CurrentUserContext } from '../context/CurrentUserContext.js';

function EditAvatatPopup(props) { 
  const avatarRef = React.useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose}>
      <input id="avatar-input" type="url" className="popup__input" name="avatar" placeholder="Ссылка на фотографию" ref={avatarRef} required /> 
      <span id="avatar-input-error" className="popup__input-error"></span>
      <button type="submit" className="popup__save-button popup__save-button_active" onClick={handleSubmit}>Сохранить</button> 
    </PopupWithForm> 
  );
}

export default EditAvatatPopup;
