import React from 'react';
import { observer } from 'mobx-react';
import { Link as RouterLink } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { ReactComponent as IconHeart } from 'src/assets/img/icons/heart-filled.svg';
import { routes } from 'src/scenes/routes';
import Badge from 'src/components/Badge/Badge';
import s from './UserPanel.module.scss';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

function UserPanel({ children }) {
  const { auth, viewer } = useStore();

  return (
    <div className={s.actions}>
      <ul>
        <li>
          <RouterLink
            to={routes.addProduct}
            className={`${s.buttonLogin}`}
          >
            sell
          </RouterLink>
        </li>

        <li>
          {!auth.isLoggedIn ? (
            <RouterLink to={routes.login} className={s.button}>
              login
            </RouterLink>
          ) : (
            <ProfileMenu />
          )}
        </li>

        <li>
          <RouterLink
            to={routes.saved}
            className={`${s.button} ${s.buttonSaved} ${
              viewer.savedProducts.count ? s.active : ''
            }`}
          >
            <Badge count={viewer.savedProducts.count}>
              <IconHeart />
            </Badge>
          </RouterLink>
        </li>
      </ul>
      {children}
    </div>
  );
}

export default observer(UserPanel);
