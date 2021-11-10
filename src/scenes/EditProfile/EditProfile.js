import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import * as Yup from 'yup';
import useTitle from 'src/hooks/useTitle';
import { useStore } from 'src/stores/createStore';
import EditProfileForm from './components/EditProfileForm/EditProfileForm';
import s from './EditProfile.module.scss';

const formProps = {
  validationSchema: Yup.object().shape({
    fullName: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required').nullable(),
    location: Yup.string()
      .required('Location is required')
      .nullable(),
  }),
  enableReinitialize: true,
};

function EditProfile() {
  const store = useStore();
  const history = useHistory();

  useTitle('Edit account');

  const handleSubmit = async ({
    fullName,
    phone,
    location,
    avatar,
  }) => {
    await store.auth.saveAccount.run({
      fullName,
      phone,
      location,
      avatar,
    });

    history.push('/');
  };

  return (
    <div className={s.container}>
      <EditProfileForm
        {...formProps}
        initialValues={
          store.viewer.user || {
            fullName: '',
            phone: '',
            location: '',
            avatar: '',
          }
        }
        isLoading={
          store.auth.saveAccount.isLoading || store.viewer.isLoading
        }
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default observer(EditProfile);
