import React from 'react';
import s from './Badge.module.scss';

function Badge({ count, children }) {
  return (
    <span className={`badge ${s.container}`}>
      {!!count && (
        <span className={`badge__count ${s.count}`}>{count}</span>
      )}
      {children}
    </span>
  );
}

export default Badge;
