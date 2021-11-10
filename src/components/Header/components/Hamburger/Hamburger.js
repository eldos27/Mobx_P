import React from 'react';
import s from './Hamburger.module.scss';

function Hamburger({ close = false, ...props }) {
  return (
    <button
      className={`hamburger ${s.hamburger} ${close ? s.active : ''}`}
      {...props}
    >
      <span />
      <span />
      <span />
    </button>
  );
}

export default Hamburger;
