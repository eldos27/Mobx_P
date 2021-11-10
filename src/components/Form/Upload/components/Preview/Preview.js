import React from 'react';
import s from './Preview.module.scss';

function Preview({ images = [], onRemove }) {
  const handleClick = (e, i) => {
    e.preventDefault();
    onRemove(i);
  };

  return (
    <>
      <span className={`fieldContainer ${s.preview}`}>
        <span role="button" className={`${s.add} ${s.item}`} />
        {images.map((image, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={i} className={`${s.image} ${s.item}`}>
            <img src={image} alt="" />
            <button
              type="button"
              onClick={(e) => handleClick(e, i)}
            />
          </span>
        ))}
      </span>
    </>
  );
}

export default Preview;
