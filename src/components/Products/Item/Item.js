import React from 'react';
import { observer } from 'mobx-react';
import ReactPlaceholder from 'react-placeholder';
import {
  TextBlock,
  RectShape,
} from 'react-placeholder/lib/placeholders';
import 'react-placeholder/lib/reactPlaceholder.css';
import { generatePath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from 'src/scenes/routes';
import { ReactComponent as IconHeart } from 'src/assets/img/icons/heart-filled.svg';
import { useStore } from 'src/stores/createStore';
import s from './Item.module.scss';
import Image from '../../Image/Image';

function Item({ item, ready = false }) {
  const { viewer } = useStore();
  const link = item && generatePath(routes.product, { id: item.id });
  const itemPlaceholder = (
    <div style={{ paddingBottom: '8px' }}>
      <RectShape
        color="#E0E0E0"
        style={{ width: '100%', height: 140 }}
      />
      <TextBlock rows={2} color="#E0E0E0" />
    </div>
  );

  return (
    <div className={s.item}>
      <ReactPlaceholder
        showLoadingAnimation
        ready={ready}
        customPlaceholder={itemPlaceholder}
      >
        {item && (
          <>
            <RouterLink to={link}>
              <Image
                src={!!item.photos?.length && item.photos[0]}
                alt={item.title}
                paddingTop="73%"
              />
            </RouterLink>
            <div className={s.body}>
              {viewer?.user?.id !== item.ownerId && (
                <button
                  className={`${s.button} ${
                    item.saved ? s.active : ''
                  }`}
                  onClick={() =>
                    viewer.savedProducts.toggleItem(item)
                  }
                  disabled={viewer.savedProducts.isLoading}
                >
                  <IconHeart />
                </button>
              )}
              <RouterLink className={s.title} to={link}>
                {item.title}
              </RouterLink>
              <span className={s.price}>${item.price}</span>
            </div>
          </>
        )}
      </ReactPlaceholder>
    </div>
  );
}

export default observer(Item);
