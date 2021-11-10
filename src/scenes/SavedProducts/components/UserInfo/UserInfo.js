import React from 'react';
import s from './UserInfo.module.scss';

function UserInfo({ count = 0 }) {
  return (
    <div className={s.info}>
      <div className={`${s.item} ${s.feedback}`}>
        <span className={s.value}>88%</span>
        <span className={s.label}>Positive feedback</span>
      </div>
      <div className={`${s.item}`}>
        <span className={s.value}>123</span>
        <span className={s.label}>Sales</span>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <span className={s.value}>{count}</span>
        <span className={s.label}>Active listings</span>
      </div>
    </div>
  );
}

export default UserInfo;
