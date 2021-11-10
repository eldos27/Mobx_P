import React from 'react';
import * as Yup from 'yup';
import useTitle from 'src/hooks/useTitle';
import RestoreForm from './components/RestoreForm/RestoreForm';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email required'),
});

function Auth() {
  useTitle('Restore Password');

  return (
    <RestoreForm
      initialValues={{
        email: '',
      }}
      validationSchema={validationSchema}
    />
  );
}

export default Auth;
