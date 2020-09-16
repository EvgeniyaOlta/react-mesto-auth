import React from 'react';
import * as auth from '../auth.js';
import { Link, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import error from '../images/error.svg';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
 
  function handleSubmit(e) {
    e.preventDefault();
    
    auth.register(email, password).then((res) => {
      if(res.data){
        setEmail('');
        setPassword('');
        props.handleLogin();
        props.changeUserEmail(res.data.email);
        history.push('/');
        props.onInfoTooltipOk();
      } else {
        props.onInfoTooltipError();
      }
    })
    .catch((err) => {
      console.log(err)
      props.onInfoTooltipError();
    });
  }

    return (
        <section className="enter-block"> 
        <form className="enter-block__container">  
          <p className="enter-block__title">Регистрация</p> 
          <fieldset className="enter-block__list"> 
            <input className="enter-block__input" name="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} /> 
            <input type="password" className="enter-block__input"  name="password" placeholder="Пароль" required onChange={e => setPassword(e.target.value)} /> 
            <button type="submit" className="enter-block__enter-button" onClick={handleSubmit}>Зарегистрироваться</button> 
          </fieldset> 
        </form> 
        <Link to="/sign-in" className="enter-block__redirect-button" onClick={props.LoginPageActive}>Уже зарегистрированы? Войти</Link>
          <InfoTooltip isOpen={props.isInfoTooltipErrorOpen} onClose={props.onClose} >  
            <div className="info-tooltip__image" style={{ backgroundImage: `url(${error})` }}> </div>
            <p className="info-tooltip__title info-tooltip__title_error">Что-то пошло не так! Попробуйте еще раз.</p> 
          </InfoTooltip> 
        </section> 
        
    );
  }

  export default Register;