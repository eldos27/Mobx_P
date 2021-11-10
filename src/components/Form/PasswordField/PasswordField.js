import React, { useState } from 'react';
import { ReactComponent as IconEye } from 'src/assets/img/icons/eye.svg';
import FormField from '../Field/Field';
import s from './PasswordField.module.scss';

function PasswordField(props) {
  const [isVisible, setIsVisible] = useState(false);

  const eyeButton = (
    <button
      className={`${s.button} ${isVisible ? s.active : ''}`}
      type="button"
      onClick={() => setIsVisible(!isVisible)}
    >
      <IconEye />
    </button>
  );

  return (
    <FormField
      type={isVisible ? 'text' : 'password'}
      icon={eyeButton}
      {...props}
    />
  );
}

export default PasswordField;
