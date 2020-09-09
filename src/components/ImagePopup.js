import React from 'react';

function ImagePopup(props) { 
  return (
    <section className={`popup popup_image ${props.card !== null && 'popup_opened'}`}>
      <div className="popup__container">  
        <button className="popup__close-button" type="button" onClick={props.onClose}></button> 
        <div className="popup__image" style={{ backgroundImage: `url(${props.card !== null && props.card.link})` }}  > </div>
        <p className="popup__title popup__title_for-image">{props.card !== null && props.card.name}</p> 
      </div> 
    </section> 
  );
}

export default ImagePopup;
