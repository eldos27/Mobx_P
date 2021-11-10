import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { Product } from '../schemas';
import { asyncModel } from '../utils';
import { ProductModel } from './ProductModel';

export const OwnProducts = types
  .model('OwnProductsStore', {
    items: types.array(
      types.reference(types.late(() => ProductModel)),
    ),
    count: 0,
    fetch: asyncModel(fetchOwnProducts),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
    setCount(value) {
      store.count = value;
    },
  }));

function fetchOwnProducts(id) {
  return async (flow, store) => {
    const res = await Api.User.getProducts(id);
    const { list, count } = res.data;
    const result = flow.merge(list, [Product]);

    store.setItems(result);
    store.setCount(count);
  };
}
