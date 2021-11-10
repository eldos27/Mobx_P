import React from 'react';
import { observer } from 'mobx-react';
import Item from './Item/Item';
import s from './Products.module.scss';

function Products({
  placeholderNum = 12,
  isLoading = false,
  items = [],
  fallback = 'No products were found',
}) {
  return (
    <>
      {!items.length && !isLoading ? (
        <p className="not-found">{fallback}</p>
      ) : (
        <div className={s.container}>
          <div className={s.items}>
            {items.length
              ? items.map((item) => (
                  <Item key={item.id} item={item} ready />
                ))
              : Array.from(Array(placeholderNum)).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Item key={index} />
                ))}
          </div>
        </div>
      )}
    </>
  );
}

export default observer(Products);
