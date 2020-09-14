import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Register from './Register.js';
import Login from './Login.js';
import Footer from './Footer.js';
import api from '../utils/api';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import { BrowserRouter } from 'react-router-dom'; 
import * as auth from '../auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOkOpen, setIsInfoTooltipOkOpen] = React.useState(false);
  const [isInfoTooltipErrorOpen, setIsInfoTooltipErrorOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] =React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [userEmail, setUserEmail] = React.useState('');
  const [loginPage, setLoginPage] = React.useState(true);

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
 
  function handleLogin(){
    setLoggedIn(true) 
  };
  
  function handleLogout(){
    setLoggedIn(false) 
  };

  function LoginPageActive(){
    setLoginPage(true) 
  };
  function LoginPageDisactive(){
    setLoginPage(false) 
  };

  function changeUserEmail(email){
    setUserEmail(email) 
  };

  React.useEffect(() => {
    tokenCheck ()
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      auth.getContent(jwt).then((res) => {
        console.log(res)
        if (res.data){
          setLoggedIn(true);
          console.log(res.data.email);
          changeUserEmail(res.data.email);
          history.push('/')
        }
      })
      .catch(err => console.log(err));
    }
  }
  

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
  function handleInfoTooltipOkClick() {
    setIsInfoTooltipOkOpen(true);
  }
  function handleInfoTooltipErrorClick() {
    setIsInfoTooltipErrorOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOkOpen(false);
    setIsInfoTooltipErrorOpen(false)
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
    <BrowserRouter>
      <Switch> 
        <CurrentUserContext.Provider value={currentUser}>
          <Header 
            loggedIn={loggedIn} 
            changeUserEmail={changeUserEmail}
            handleLogout={handleLogout} 
            userEmail={userEmail} 
            loginPage={loginPage}
            LoginPageDisactive={LoginPageDisactive}
            LoginPageActive={LoginPageActive} />
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} onEditProfile ={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} 
              onCardClick = {handleCardClick}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              onUpdateAvatar={handleUpdateAvatar}
              isEditAvatarPopupOpen={isEditAvatarPopupOpen} 
              isAddPlacePopupOpen={isAddPlacePopupOpen} 
              isEditProfilePopupOpen={isEditProfilePopupOpen} 
              isInfoTooltipOkOpen={isInfoTooltipOkOpen} 
              card={selectedCard} 
              cards={cards} 
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onAddNewPlace={handleAddNewPlace} />
          <Route path="/sign-up">
            <Register 
            LoginPageActive={LoginPageActive}
              handleLogin={handleLogin}
              changeUserEmail={changeUserEmail} 
              onInfoTooltipOk={handleInfoTooltipOkClick} 
              onInfoTooltipError={handleInfoTooltipErrorClick} 
              isInfoTooltipErrorOpen={isInfoTooltipErrorOpen} 
              onClose={closeAllPopups}/>
          </Route>
          <Route path="/sign-in">
            <Login 
              LoginPageDisactive={LoginPageDisactive}
              changeUserEmail={changeUserEmail}
              handleLogin={handleLogin} 
              onInfoTooltipOk={handleInfoTooltipOkClick}
              onInfoTooltipError={handleInfoTooltipErrorClick}
              isInfoTooltipErrorOpen={isInfoTooltipErrorOpen} 
              onClose={closeAllPopups} />
          </Route>
        </CurrentUserContext.Provider>
      </Switch>
    </BrowserRouter>
    <Footer />
  
   </div>
  );
}

export default App;
