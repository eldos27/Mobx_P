import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useLocation } from 'react-router';
import { useStore } from 'src/stores/createStore';
import Products from 'src/components/Products/Products';
import Filter from 'src/components/Products/Filter/Filter';
import useTitle from 'src/hooks/useTitle';

const queryString = require('query-string');

function LatestProducts() {
  const location = useLocation();
  const { searchProducts } = useStore();
  const { items } = searchProducts;
  const { inProcessing, touched } = searchProducts.fetch;

  useTitle('Search');
  useEffect(() => {
    if (!items.length && !touched) {
      const params = queryString.parse(location.search);
      searchProducts.fetch.run(params);
    }
  }, [location]);

  return (
    <>
      <Filter />
      <Products
        items={items}
        isLoading={inProcessing}
        placeholderNum={4}
        fallback="No products were found matching your selection"
      />
    </>
  );
}

export default observer(LatestProducts);
