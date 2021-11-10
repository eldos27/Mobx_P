import React from 'react';
import Form from 'src/components/Form/';
import FormContainer from 'src/components/Form/Container/Container';
import FormField from 'src/components/Form/Field/Field';
import FormTitle from 'src/components/Form/Title/Title';
import FormSubmit from 'src/components/Form/Submit/Submit';
import FormUpload from 'src/components/Form/Upload/Upload';

function AddProductForm(props) {
  return (
    <FormContainer>
      <FormTitle text="Add product" />
      <Form {...props}>
        <FormField
          name="title"
          label="title"
          type="text"
          placeholder="For example: Iron man suit"
        />
        <FormField
          name="location"
          label="location"
          type="text"
          placeholder="For example: Los Angeles, CA"
        />
        <FormField
          name="description"
          label="description"
          type="text"
          rows={5}
          placeholder="For example: Iron man suit"
        />
        <FormUpload
          name="photos"
          label="photos"
          accept="image/*"
          maxFiles={6}
        />
        <FormField
          name="price"
          label="price"
          type="number"
          placeholder="Product price"
        />
        <FormSubmit text="submit" uppercase />
      </Form>
    </FormContainer>
  );
}

export default AddProductForm;
