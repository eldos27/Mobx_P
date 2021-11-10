import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as Logo } from 'src/assets/img/logo.svg';
import { routes, DisableOnRoutes } from 'src/scenes/routes';
import s from './Header.module.scss';
import UserPanel from './components/UserPanel/UserPanel';
import SearchFrom from './components/SearchForm/SearchForm';
import Hamburger from './components/Hamburger/Hamburger';

function Header({ dark = true }) {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <header className={`${s.header} ${dark ? s.headerDark : ''}`}>
      <div className={`${s.container}`}>
        <RouterLink
          className={`${s.logo} ${menuActive ? s.menuActive : ''}`}
          to={routes.home}
        >
          <Logo />
        </RouterLink>
        {!menuActive && (
          <Hamburger onClick={() => setMenuActive(!menuActive)} />
        )}
        <div className={`${s.content} ${menuActive ? s.active : ''}`}>
          <UserPanel>
            <Hamburger
              close
              onClick={() => setMenuActive(!menuActive)}
            />
          </UserPanel>

          <DisableOnRoutes
            paths={[routes.auth, routes.account, routes.addProduct]}
          >
            <SearchFrom />
          </DisableOnRoutes>
        </div>
      </div>
    </header>
  );
}

export default Header;
