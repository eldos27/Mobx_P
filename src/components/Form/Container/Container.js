import React from 'react';
import s from './Container.module.scss';

function Container({ children }) {
  return (
    <div className={`form-container ${s.container}`}>{children}</div>
  );
}

export default Container;
