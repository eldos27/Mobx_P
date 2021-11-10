import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { asyncModel } from '../utils';
import { ProductModel } from './ProductModel';
import { LatestProductsCollection } from '../schemas';

export const LatestProductsStore = types
  .model('LatestProductsStore', {
    items: types.array(types.reference(ProductModel)),
    fetch: asyncModel(fetchLatest),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchLatest() {
  return async (flow, store) => {
    const res = await Api.Products.getLatest();
    const result = flow.merge(res.data, LatestProductsCollection);

    store.setItems(result);
  };
}
