import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { ReactComponent as IconHeart } from 'src/assets/img/icons/heart-filled.svg';
import UserInfo from 'src/components/User/Info/Info';
import { useStore } from 'src/stores/createStore';
import s from './Sidebar.module.scss';
import Modal from '../Modal/Modal';

function Sidebar({ seller, product }) {
  const { viewer } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const disableButtons =
    !product || viewer?.user?.id === product.ownerId;

  function handleClickModal() {
    setIsOpen(!isOpen);
  }

  function handleClickAddToFavorite() {
    viewer.savedProducts.toggleItem(product);
  }

  return (
    <aside className={s.sidebar}>
      <div className={s.seller}>
        <Modal
          user={seller}
          subject={product?.title}
          isOpen={isOpen}
          onClose={() => handleClickModal()}
          onRequestClose={() => handleClickModal()}
        />
        <UserInfo user={seller} withLink />
      </div>

      <div className={s.actions}>
        <button
          disabled={disableButtons}
          className={s.buttonChat}
          onClick={() => handleClickModal()}
        >
          chat with seller
        </button>
        <button
          disabled={disableButtons || viewer.savedProducts.isLoading}
          className={`${s.buttonSave} ${
            product?.saved ? s.active : ''
          }`}
          onClick={() => handleClickAddToFavorite}
        >
          <IconHeart />{' '}
          {!product?.saved
            ? 'add to favorite'
            : 'remove from favorite'}
        </button>
      </div>
    </aside>
  );
}

export default observer(Sidebar);
