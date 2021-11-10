import React from 'react';
import { useHistory } from 'react-router-dom';
import { generatePath } from 'react-router';
import { observer } from 'mobx-react';
import * as Yup from 'yup';
import useTitle from 'src/hooks/useTitle';
import { useStore } from 'src/stores/createStore';
import AddProductForm from './components/AddProductForm/AddProductForm';
import s from './AddProduct.module.scss';
import { routes } from '../routes';

const formProps = {
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Title is required'),
    location: Yup.string().required('Location is required'),
    price: Yup.number().required('Price is required'),
  }),
};

function AddProduct() {
  useTitle('EditProfile');

  const store = useStore();
  const history = useHistory();
  const { addProduct } = store.entities.products;

  const handleSubmit = async (values) => {
    const res = await addProduct.run(values);
    history.push(generatePath(routes.product, { id: res.id }));
  };

  return (
    <div className={s.container}>
      <AddProductForm
        {...formProps}
        initialValues={{
          title: '',
          description: '',
          location: '',
          photos: [],
          price: '',
        }}
        isLoading={addProduct.isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default observer(AddProduct);
