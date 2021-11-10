import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { readFile } from './utils';
import s from './Upload.module.scss';
import Preview from './components/Preview/Preview';

function Upload({
  name,
  label,
  maxFiles = 3,
  extensions = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i,
  renderPreview,
}) {
  const [images, setImages] = useState([]);
  const { values, setFieldValue } = useFormikContext();

  function handleChange(e) {
    Array.from(e.target.files).forEach(async (file) => {
      if (extensions.exec(file.name) && images.length < maxFiles) {
        try {
          const res = await readFile(file);

          setImages([...images, res]);
          setFieldValue(
            name,
            maxFiles > 1 ? [...(values[name] || []), file] : file,
          );

          // eslint-disable-next-line no-empty
        } catch (err) {}
      }
    });
  }

  function handleRemove(index) {
    setFieldValue(
      name,
      values[name].filter((val, i) => i !== index),
    );
    setImages(images.filter((val, i) => i !== index));
  }

  const preview = renderPreview ? (
    renderPreview(images, handleRemove)
  ) : (
    // eslint-disable-next-line react/jsx-no-bind
    <Preview images={images} onRemove={handleRemove} />
  );

  return (
    <label className={`field ${s.container}`}>
      {!!label && <span className="fieldTitle">{label}</span>}
      <input
        name={name}
        type="file"
        onChange={(e) => handleChange(e)}
        multiple
      />
      {preview}
    </label>
  );
}

export default Upload;
