import React from 'react';
import s from './Avatar.module.scss';

function Avatar({ avatar = '', fullName = '' }) {
  return (
    <span className={`avatar ${s.avatar}`}>
      {avatar ? (
        <img src={avatar} alt="avatar" />
      ) : (
        <span>{fullName.split(' ').map((l) => l[0])}</span>
      )}
    </span>
  );
}

export default Avatar;
