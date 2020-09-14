import React from 'react';

function InfoTooltip(props) {
    return (
      <section className={`info-tooltip ${props.isOpen && 'info-tooltip_opened'}`}>  
        <div className="info-tooltip__container">  
          <button className="info-tooltip__close-button" type="button" onClick={props.onClose}></button> 
          {props.children}
        </div> 
      </section> 
    );
  }

  export default InfoTooltip