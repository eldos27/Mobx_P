import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import * as Yup from 'yup';
import useTitle from 'src/hooks/useTitle';
import { useStore } from 'src/stores/createStore';
import LoginForm from './components/LoginForm/LoginForm';

const formProps = {
  initialValues: { email: '', password: '' },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email required'),
    password: Yup.string().required('Password required'),
  }),
  enableReinitialize: true,
};

const handleErrors = {
  404: {
    email: 'User is not found',
  },
  401: {
    password: 'Wrong password',
  },
};

function Login() {
  useTitle('Login');

  const store = useStore();
  const history = useHistory();

  const handleSubmit = async ({ email, password }) => {
    try {
      await store.auth.login.run({ email, password });
      history.push('/');
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  return (
    <>
      <LoginForm
        {...formProps}
        isLoading={
          store.auth.login.isLoading || store.viewer.isLoading
        }
        onSubmit={handleSubmit}
        initialErrors={handleErrors[store.auth.login.errorCode]}
      />
    </>
  );
}

export default observer(Login);
