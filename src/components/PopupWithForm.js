import React from 'react';

function PopupWithForm(props) {
    return (
      <section className={`popup popup-with-form popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>  
        <form name={`${props.name}`} className={`popup__container popup__container_for-form popup__container_type_${props.name}`} noValidate>  
          <button className="popup__close-button" type="button" onClick={props.onClose}></button> 
          <p className="popup__title">{props.title}</p> 
          <fieldset className="popup__list"> 
            {props.children}
          </fieldset>
        </form> 
        </section> 
    );
  }

  export default PopupWithForm