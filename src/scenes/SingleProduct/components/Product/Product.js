import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import { RectShape } from 'react-placeholder/lib/placeholders';
import { ReactComponent as IconLocation } from 'src/assets/img/icons/location.svg';
import Image from 'src/components/Image/Image';
import s from './Product.module.scss';

function Product({ product }) {
  const placeholder = (
    <article className={s.product}>
      <div style={{ position: 'relative', paddingTop: '50%' }}>
        <RectShape
          color="#E0E0E0"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
        />
      </div>
      <div className={s.meta}>
        <RectShape
          color="#E0E0E0"
          style={{ margin: '10px 0', height: 100 }}
        />
      </div>
    </article>
  );

  return (
    <ReactPlaceholder
      showLoadingAnimation
      customPlaceholder={placeholder}
      ready={!!product}
    >
      {product && (
        <article className={s.product}>
          <div className={s.image}>
            <Image
              src={!!product.photos?.length && product.photos[0]}
              alt={product.title}
              paddingTop="50%"
            />
            <span className={s.price}>${product.price}</span>
          </div>
          <div className={s.meta}>
            <div className={s.title}>
              <h1>{product.title}&nbsp;</h1>
              <time>
                {new Date(product.updatedAt).toLocaleString('uk-UA')}
              </time>
            </div>
            <div className={s.location}>
              <IconLocation />
              {product.location}
            </div>
          </div>
          <div className={s.description}>
            <p>{product.description}</p>
          </div>
        </article>
      )}
    </ReactPlaceholder>
  );
}

export default Product;
