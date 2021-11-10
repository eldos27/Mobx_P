import React from 'react';
import { useFormikContext } from 'formik';

import s from './Submit.module.scss';

function Submit({ text, uppercase, dark = false }) {
  const { isValid } = useFormikContext();
  return (
    <button
      disabled={!isValid}
      type="submit"
      className={`submit ${s.submit}  ${
        uppercase ? s.uppercase : s.regular
      } ${dark ? s.dark : ''}`}
    >
      {text}
    </button>
  );
}

export default Submit;
