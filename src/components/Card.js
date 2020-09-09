import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);  
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.cardData.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `card__remove-button ${isOwn ? 'card__remove-button_active' : 'card__delete-button_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователе
  const isLiked = props.cardData.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active' : 'card__like-button_hidden'}`
  );

  function handleClick () {
    props.onCardClick({
      name: props.cardData.name,
      link: props.cardData.link
    });
  }

  function handleLikeClick () {
    props.onCardLike(props.cardData)
  }

  function handleLikeDelete () {
    props.onCardDelete(props.cardData)
  }


  return (
    <article className="card">
        <button className={cardDeleteButtonClassName} type="button" onClick={handleLikeDelete}></button>
        <div className="card__image" style={{ backgroundImage: `url(${props.cardData.link})` }} onClick={handleClick}></div>
        <p className="card__name">{props.cardData.name}</p>
        <div className="card__like-block">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="card__like-amount">{props.cardData.likes.length}</p>
        </div>
      </article>
  );
}


export default Card;