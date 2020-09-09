import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function EditProfilePopup(props) { 
  const [name, setName] = React.useState([]);
  const [description, setDescription] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser !== null && currentUser.name);
    setDescription(currentUser !== null && currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose}>  
      <input id="name-input" type="text" className="popup__input" name="name" placeholder="Имя" pattern="[a-zA-Zа-яА-Я\s\-]+" required minLength="2" maxLength="40" value={name} onChange={handleNameChange} /> 
      <span id="name-input-error" className="popup__input-error"></span>
      <input id="description-input" type="text" className="popup__input" name="description" placeholder="Описание" required minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} /> 
      <span id="description-input-error" className="popup__input-error"></span>
      <button type="submit" className="popup__save-button popup__save-button_active " onClick={handleSubmit}>Сохранить</button> 
    </PopupWithForm> 
  );
}

export default EditProfilePopup;
