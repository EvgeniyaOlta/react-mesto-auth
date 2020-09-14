import React from 'react';
import logo from '../images/logo_white.svg';
import { Link, useHistory } from 'react-router-dom';

function Header(props) {
  const history = useHistory();
  function signOut() {
    localStorage.removeItem('jwt');
    props.handleLogout();
    props.changeUserEmail('');
    history.push('/sign-in');
  }
  return (
    <header className="header"> 
      <img className= "header__logo" src={logo} alt="Логотип Mesto." />
      <p className= "header__current-user-mail">{props.userEmail}</p>
      {props.loggedIn === true && 
        <p className="header__redirect-button header__redirect-button_logout" onClick={signOut}>Выйти</p>
      }
      {props.loginPage === false && props.loggedIn === false &&
        <Link to="/sign-in" className="header__redirect-button" onClick={props.LoginPageActive}>Войти</Link>
      }
      {props.loginPage === true && props.loggedIn === false &&
        <Link to="/sign-up" className="header__redirect-button" onClick={props.LoginPageDisactive}>Регистрация</Link>
      } 
    </header>
  );
}

export default Header;

 // <Link to="/sign-in" className="header__redirect-button">Войти</Link>
