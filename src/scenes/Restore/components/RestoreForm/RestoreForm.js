import React from 'react';
import Form from 'src/components/Form/';
import FormContainer from 'src/components/Form/Container/Container';
import FormField from 'src/components/Form/Field/Field';
import FormTitle from 'src/components/Form/Title/Title';
import FormSubmit from 'src/components/Form/Submit/Submit';

function RestoreForm(props) {
  return (
    <>
      <FormContainer width={450}>
        <FormTitle text="Restore Password" />
        <Form {...props}>
          <FormField
            label="email"
            type="email"
            name="email"
            placeholder="Example@gmail.com"
          />
          <FormSubmit text="Continue" />
        </Form>
      </FormContainer>
    </>
  );
}

export default RestoreForm;
