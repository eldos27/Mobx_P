import React from 'react';
import { useField } from 'formik';
import s from './Select.module.scss';

function Select({ icon, options = [], placeholder, ...props }) {
  const { name } = props;
  const [field] = useField(props);

  return (
    <label className={s.selectContainer}>
      {Boolean(icon) && <div className={s.selectIcon}>{icon}</div>}
      <select className={s.select} id={name} {...props} {...field}>
        {Boolean(placeholder) && (
          <option value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
