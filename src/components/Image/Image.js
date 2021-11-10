import React, { useState } from 'react';
import { ReactComponent as Placeholder } from 'src/assets/img/placeholder.svg';
import s from './Image.module.scss';

function Image({ src, paddingTop, ...props }) {
  const [isError, setIsError] = useState(false);

  return (
    <div
      className={`image ${s.container} ${
        paddingTop ? s.absolute : ''
      }`}
      style={paddingTop ? { paddingTop } : null}
    >
      {src && !isError ? (
        <img
          alt=""
          src={src}
          {...props}
          onError={() => setIsError(true)}
        />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}

export default Image;
