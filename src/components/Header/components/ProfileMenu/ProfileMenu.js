/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
import { useStore } from 'src/stores/createStore';
import { routes } from 'src/scenes/routes';
import { Link as RouterLink } from 'react-router-dom';
import { generatePath } from 'react-router';
import { observer } from 'mobx-react';
import s from './ProfileMenu.module.scss';
import Avatar from '../../../User/Avatar/Avatar';

function ProfileMenu() {
  const ref = useRef();
  const store = useStore();
  const [isActive, setIsActive] = useState(false);
  const { user } = store.viewer;

  function handleClickOutside({ target }) {
    const node = ref.current;
    if (
      (node && node !== target && !node.contains(target)) ||
      target.tagName === 'A'
    ) {
      setIsActive(false);
    }
  }

  function handleClickLogout(e) {
    e.preventDefault();
    store.auth.logout();
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);

    return () => {
      document.removeEventListener(
        'click',
        handleClickOutside,
        false,
      );
    };
  }, []);

  return (
    <div className={s.container} ref={ref}>
      <button
        className={s.button}
        onClick={() => setIsActive(!isActive)}
      >
        <Avatar {...user} />
      </button>
      {isActive && (
        <div className={s.menu}>
          <div className={s.user}>
            <div className={s.avatar}>
              <Avatar {...user} />
            </div>
            <div className={s.info}>
              <span className={s.name}>{user.fullName}</span>
              <span className={s.email}>{user.email}</span>
              <RouterLink
                to={generatePath(routes.profile, { id: user.id })}
                className={s.link}
              >
                Profile
              </RouterLink>
            </div>
          </div>
          <ul className={s.actions}>
            <li>
              <RouterLink to={routes.account} className={s.link}>
                edit profile
              </RouterLink>
            </li>
            <li>
              <a
                href="/"
                className={s.link}
                onClick={(e) => handleClickLogout(e)}
              >
                logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default observer(ProfileMenu);
