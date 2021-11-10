import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from 'src/stores/createStore';
import Products from 'src/components/Products/Products';
import Filter from 'src/components/Products/Filter/Filter';
import useTitle from 'src/hooks/useTitle';
import Loader from 'src/components/Loader/Loader';

function LatestProducts() {
  const { latestProducts } = useStore();
  const { items } = latestProducts;
  const { inProcessing } = latestProducts.fetch;
  useTitle('Latest products');
  useEffect(() => {
    latestProducts.fetch.run();
  }, []);

  return (
    <Loader show={inProcessing}>
      <Filter />
      <Products items={items} isLoading={inProcessing} />
    </Loader>
  );
}

export default observer(LatestProducts);
