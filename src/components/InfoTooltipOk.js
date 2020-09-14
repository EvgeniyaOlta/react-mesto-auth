import React from 'react';
import InfoTooltip from './InfoTooltip';

function InfoTooltipOk() {
    return (
      <InfoTooltip >  
        <div className="info-tooltip__image" style={{ backgroundImage: `../../../images/ok.svg` }}> </div>
        <p className="info-tooltip__title ">Вы успешно зарегистрировались!</p> 
      </InfoTooltip> 
    );
  }

export default InfoTooltipOk