import React from 'react';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import useTitle from 'src/hooks/useTitle';
import { useStore } from 'src/stores/createStore';
import RegisterForm from './components/RegisterForm/RegisterForm';

const formProps = {
  initialValues: {
    email: '',
    fullName: '',
    password: '',
    confirm: '',
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email required'),
    fullName: Yup.string()
      .min(2, 'Must be at least 2 characters')
      .required('Name required'),
    password: Yup.string().required('Password required'),
    confirm: Yup.string()
      .required('Password required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  }),
  enableReinitialize: true,
};

const handleErrors = {
  409: {
    email: 'Email already used',
  },
};

function Register() {
  useTitle('Register');

  const store = useStore();
  const history = useHistory();

  const handleSubmit = async ({ fullName, email, password }) => {
    try {
      await store.auth.register.run({ fullName, email, password });
      history.push('/');
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  return (
    <RegisterForm
      onSubmit={handleSubmit}
      isLoading={store.auth.register.isLoading}
      initialErrors={handleErrors[store.auth.register.errorCode]}
      {...formProps}
    />
  );
}

export default observer(Register);
