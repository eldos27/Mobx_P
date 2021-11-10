import React from 'react';
import s from './Loader.module.scss';

function Loader({
  variant = 'line',
  show = true,
  withScreenLock = false,
  children,
}) {
  return (
    <>
      {show && (
        <>
          {withScreenLock && <div className={s.screenLock} />}
          {variant === 'line' ? (
            <div className={s.loading}>
              <div className={s.loadingWrapper}>
                <div className={s.loadingLine}>
                  <div
                    className={`${s.loadingLineInner} ${s.loadingLineInner1}`}
                  />
                  <div
                    className={`${s.loadingLineInner} ${s.loadingLineInner2}`}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={s.loadingRing}>
              <div className={s.loadingRingWrapper}>
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          )}
        </>
      )}
      {children}
    </>
  );
}

export default Loader;
