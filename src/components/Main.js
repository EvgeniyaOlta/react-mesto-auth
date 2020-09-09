import React from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Card from './Card';
import api from '../utils/api';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Main(props) {
  
  const currentUser = React.useContext(CurrentUserContext);
  const name = (currentUser !== null && currentUser.name);
  const avatar = (currentUser !== null && currentUser.avatar);
  const description = (currentUser !== null && currentUser.about);
  

  return (
    <main className="content">
    <section className="profile">
      <div className="profile__avatar-box">
        <div className="profile__avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
        <button className="profile__avatar-edit-button" onClick={props.onEditAvatar}></button>
      </div>
      <div className="profile__info">
        <div className="profile__first-line"> 
          <p className="profile__name">{name}</p>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <p className="profile__description">{description}</p>
      </div>
      <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
    </section>

    <section className="cards">
      {Array.from(props.cards).map(card =>
      <Card cardData ={card} onCardClick={props.onCardClick} key = {card._id} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
      )}
    </section>

    <EditProfilePopup isOpen={props.isEditProfilePopupOpen} onClose={props.onClose} onUpdateUser={props.onUpdateUser} />

    <EditAvatarPopup isOpen={props.isEditAvatarPopupOpen} onClose={props.onClose} onUpdateAvatar={props.onUpdateAvatar}/> 

    <AddPlacePopup isOpen={props.isAddPlacePopupOpen} onClose={props.onClose} onAddPlace={props.onAddNewPlace} /> 
    
    <PopupWithForm name="removeCard" title="Вы уверенны?">
      <button type="submit" className="popup__save-button popup__save-button_active popup__save-button_for-remove">Да</button>
    </PopupWithForm> 
    
    <ImagePopup card={props.card} onClose={props.onClose} />

  </main>
  );
}

export default Main;
