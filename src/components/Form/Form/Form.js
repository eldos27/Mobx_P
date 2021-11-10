import React from 'react';
import { Formik, Form as FForm } from 'formik';
import s from './Form.module.scss';
import Loader from '../../Loader/Loader';

function Form({
  children,
  horizontal,
  isLoading = false,
  enableScreenLock = true,
  ...restProps
}) {
  return (
    <Loader show={isLoading} withScreenLock={enableScreenLock}>
      <Formik {...restProps}>
        <FForm className={`${s.form} ${horizontal ? s.row : ''}`}>
          {children}
        </FForm>
      </Formik>
    </Loader>
  );
}

export default Form;
