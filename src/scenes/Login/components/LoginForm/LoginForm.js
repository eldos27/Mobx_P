import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from 'src/scenes/routes';
import Form from 'src/components/Form/';
import FormContainer from 'src/components/Form/Container/Container';
import FormField from 'src/components/Form/Field/Field';
import FormTitle from 'src/components/Form/Title/Title';
import FormSubmit from 'src/components/Form/Submit/Submit';
import PasswordField from 'src/components/Form/PasswordField/PasswordField';

function LoginForm(props) {
  const refreshPassword = (
    <RouterLink to={routes.restore}>
      Don’t remember password?
    </RouterLink>
  );

  return (
    <>
      <FormContainer>
        <FormTitle text="Login" />
        <Form {...props}>
          <FormField
            name="email"
            label="email"
            type="email"
            placeholder="Example@gmail.com"
          />
          <PasswordField
            name="password"
            label="password"
            helper={refreshPassword}
          />
          <FormSubmit text="Continue" />
        </Form>
      </FormContainer>
      <FormContainer width={450}>
        <p className="auth-info">
          I have no account,&nbsp;
          <RouterLink to={routes.register}>Register Now</RouterLink>
        </p>
      </FormContainer>
    </>
  );
}

export default LoginForm;
