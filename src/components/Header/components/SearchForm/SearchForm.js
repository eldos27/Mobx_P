import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useFormikContext } from 'formik';
import * as Yup from 'yup';
import { matchPath, useHistory, useLocation } from 'react-router';
import { useStore } from 'src/stores/createStore';
import { ReactComponent as IconSearch } from 'src/assets/img/icons/search.svg';
import { ReactComponent as IconLocation } from 'src/assets/img/icons/location.svg';
import Submit from 'src/components/Form/Submit/Submit';
import Form from 'src/components/Form/';
import Field from 'src/components/Form/Field/Field';
import { routes } from 'src/scenes/routes';
import s from './SearchForm.module.scss';

const queryString = require('query-string');

const validationSchema = Yup.object().shape({
  keyword: Yup.string().min(2, 'Too short').required('Required'),
  location: Yup.string().min(2, 'Too short').required('Required'),
});

function SearchFields() {
  const location = useLocation();
  const formik = useFormikContext();

  useEffect(() => {
    if (!matchPath(location.pathname, routes.search)) {
      formik.resetForm();
    }
  }, [location]);

  return (
    <>
      <Field
        name="keyword"
        type="search"
        placeholder="Search products by name"
        icon={<IconSearch />}
        iconStart
        disableHelper
      />
      <Field
        name="location"
        placeholder="Location"
        icon={<IconLocation />}
        iconStart
        disableHelper
      />
      <Submit type="submit" text="search" dark uppercase />
    </>
  );
}

function SearchForm() {
  const history = useHistory();
  const rLocation = useLocation();
  const { searchProducts } = useStore();
  const { keyword = '', location = '' } = queryString.parse(
    rLocation.search,
  );

  async function handleSubmit(values) {
    await searchProducts.fetch.run(values);

    history.push({
      pathname: routes.search,
      search: queryString.stringify(values),
    });
  }

  return (
    <div className={s.container}>
      <Form
        horizontal
        enableReinitialize
        resetForm
        enableScreenLock={false}
        isLoading={searchProducts.fetch.isLoading}
        initialValues={{ keyword, location }}
        validationSchema={validationSchema}
        // eslint-disable-next-line react/jsx-no-bind
        onSubmit={handleSubmit}
      >
        <SearchFields />
      </Form>
    </div>
  );
}

export default observer(SearchForm);
