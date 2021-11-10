import React from 'react';
import Avatar from 'src/components/User/Avatar/Avatar';
import FormUpload from 'src/components/Form/Upload/Upload';
import s from './UpdateAvatar.module.scss';

function UpdateAvatar({ hasAvatar, name, ...props }) {
  const { avatar, fullName } = props;

  const renderPreview = (images) => (
    <>
      <Avatar
        avatar={images.length ? images[0] : avatar}
        fullName={fullName}
      />
      <span role="button" className={s.button}>
        Upgrade Photo
      </span>
    </>
  );

  return (
    <div className={s.container}>
      <FormUpload
        accept="image/*"
        maxFiles={1}
        name={name}
        renderPreview={renderPreview}
      />
    </div>
  );
}

export default UpdateAvatar;
