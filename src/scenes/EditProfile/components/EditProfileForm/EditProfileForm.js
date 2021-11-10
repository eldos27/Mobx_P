import React from 'react';
import Form from 'src/components/Form/';
import FormContainer from 'src/components/Form/Container/Container';
import FormField from 'src/components/Form/Field/Field';
import FormTitle from 'src/components/Form/Title/Title';
import FormSubmit from 'src/components/Form/Submit/Submit';
import UpdateAvatar from '../UpdateAvatar/UpdateAvatar';

function LoginForm(props) {
  const { avatar, fullName } = props.initialValues;
  return (
    <FormContainer>
      <FormTitle text="Edit profile" />
      <Form {...props}>
        <UpdateAvatar
          name="avatar"
          avatar={avatar}
          fullName={fullName}
        />
        <FormField
          name="fullName"
          label="Full name"
          type="text"
          placeholder="Tony Stark"
        />
        <FormField
          name="phone"
          label="Phone"
          type="text"
          placeholder="+ 380 __ __ ___"
        />
        <FormField name="location" label="Location" type="text" />
        <FormSubmit text="Save" />
      </Form>
    </FormContainer>
  );
}

export default LoginForm;
