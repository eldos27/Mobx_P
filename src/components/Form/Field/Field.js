import React from 'react';
import { useField } from 'formik';
import './Field.scss';
import s from './Field.module.scss';

function Field({
  label,
  icon,
  iconStart = false,
  helper = true,
  dense = false,
  width = 0,
  disableHelper = false,
  ...props
}) {
  const { name, rows } = props;
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <label className="field" htmlFor={name}>
      {Boolean(label) && <span className="fieldTitle">{label}</span>}
      <span
        className={`fieldContainer ${s.container} ${
          hasError ? s.hasError : ''
        } ${dense ? s.dense : ''}`}
      >
        {!rows ? (
          <input
            style={width ? { width } : null}
            className={s.input}
            id={name}
            {...field}
            {...props}
            value={field.value || ''}
          />
        ) : (
          <textarea
            style={width ? { width } : null}
            className={`${s.input} ${s.textarea}`}
            id={name}
            {...field}
            {...props}
            value={field.value || ''}
          />
        )}
        {Boolean(icon) && (
          <span
            className={s.icon}
            style={iconStart ? { order: -1 } : null}
          >
            {icon}
          </span>
        )}
      </span>
      {!disableHelper && (hasError || Boolean(helper)) && (
        <span className={s.helpers}>
          {hasError ? (
            <span className={s.error}>{meta.error}</span>
          ) : null}
          {Boolean(helper) && (
            <span className={s.helper}>{helper}</span>
          )}
        </span>
      )}
    </label>
  );
}

export default Field;
