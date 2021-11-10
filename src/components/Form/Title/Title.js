import React from 'react';
import s from './Title.module.scss';

function Title(props) {
  return <h1 className={s.title}>{props.text}</h1>;
}

export default Title;
