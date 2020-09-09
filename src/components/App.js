import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/api';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] =React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then((userInfoData) => {
      setCurrentUser(userInfoData);
    })
    .catch(() => {
      console.error('Что-то пошло не так.');
    });
  }, []);
  

  React.useEffect(() => {
    api.getInitialCards()
    .then(cardsInfoData => {
      Array.from(cardsInfoData)
      setCards(cardsInfoData);
    })
    .catch(() => {
      console.error('Что-то пошло не так.');
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
    const newCards = cards.filter(function(item) {
      return card._id !== item._id;
      });
      setCards(newCards);
    });
  }


  function handleCardClick (card){
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null)
  }
  function handleUpdateUser(userName, userDescription) {
    api.patchUserInfo(userName, userDescription).then((data) => {
      setCurrentUser({
        ...currentUser,
        name: data.name,
        about: data.about
      });
      closeAllPopups()
    });
  }
  function handleUpdateAvatar (avatarLink) {
    api.patchAvatar(avatarLink).then((data) => {
      setCurrentUser({
        ...currentUser,
        avatar: data.avatar
      });
      closeAllPopups()
    });
  }

  function handleAddNewPlace (name, link) {
    api.postNewCard(name, link).then((newCard) => {
      setCards([...cards, newCard]);
      closeAllPopups()
    });
  }

  return (
   <div className="root"> 
    <Header />
    <CurrentUserContext.Provider value={currentUser}>
    <Main 
    onEditProfile ={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} 
    onCardClick = {handleCardClick}
    onClose={closeAllPopups}
    onUpdateUser={handleUpdateUser}
    onUpdateAvatar={handleUpdateAvatar}
    isEditAvatarPopupOpen={isEditAvatarPopupOpen} 
    isAddPlacePopupOpen={isAddPlacePopupOpen} 
    isEditProfilePopupOpen={isEditProfilePopupOpen} 
    card={selectedCard} 
    cards={cards} 
    onCardLike={handleCardLike}
    onCardDelete={handleCardDelete}
    onAddNewPlace={handleAddNewPlace}
    />
    </CurrentUserContext.Provider>
    <Footer />
  
   </div>
  );
}

export default App;
