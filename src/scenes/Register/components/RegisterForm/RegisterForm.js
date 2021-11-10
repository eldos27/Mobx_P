import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from 'src/scenes/routes';
import Form from 'src/components/Form/';
import FormContainer from 'src/components/Form/Container/Container';
import FormField from 'src/components/Form/Field/Field';
import FormTitle from 'src/components/Form/Title/Title';
import FormSubmit from 'src/components/Form/Submit/Submit';
import PasswordField from 'src/components/Form/PasswordField/PasswordField';

function RegisterForm(props) {
  return (
    <>
      <FormContainer>
        <FormTitle text="Register" />
        <Form {...props}>
          <FormField
            label="email"
            type="email"
            name="email"
            placeholder="Example@gmail.com"
          />
          <FormField
            name="fullName"
            type="text"
            label="full name"
            placeholder="Tony Stark"
          />
          <PasswordField name="password" label="password" />
          <PasswordField name="confirm" label="password again" />
          <FormSubmit text="Continue" />
        </Form>
      </FormContainer>
      <FormContainer>
        <p className="auth-info">
          I already have an account,&nbsp;
          <RouterLink to={routes.login}>Log In</RouterLink>
        </p>
      </FormContainer>
    </>
  );
}

export default RegisterForm;
