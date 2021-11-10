import React from 'react';
import Modal from 'react-modal';
import * as Yup from 'yup';
import Form from 'src/components/Form';
import Field from 'src/components/Form/Field/Field';
import Submit from 'src/components/Form/Submit/Submit';
import UserInfo from 'src/components/User/Info/Info';
import './Modal.scss';

const formProps = {
  validationSchema: Yup.object().shape({
    message: Yup.string().required('Message is required'),
  }),
  initialValues: {
    message: '',
  },
};

function ContactModal({ user, subject, onClose, ...props }) {
  return (
    <Modal {...props}>
      <div className="modal">
        <header className="modal__header">
          <h2>Contact seller</h2>
          <button className="modal__close" onClick={onClose} />
        </header>
        <div className="modal__body">
          <h3>{subject}</h3>
          <UserInfo user={user} withLink />
          <div className="modal__form">
            <Form {...formProps}>
              <Field
                name="message"
                label="message"
                rows={7}
                placeholder="For example: Iron man suit"
              />
              <Submit text="Submit" uppercase />
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ContactModal;
