import Api from 'src/api';
import { useStore } from 'src/stores/createStore';
import { ProductModel } from '../Products/ProductModel';
import { asyncModel, createCollection } from '../utils';
import { Product } from '../schemas';

export const ProductsCollection = createCollection(ProductModel, {
  getSingle: asyncModel(getProduct),
  addProduct: asyncModel(addProduct),
});

export function useProductsCollection() {
  const store = useStore();
  return store.entities.products;
}

function getProduct(id) {
  return async (flow) => {
    const res = await Api.Products.getById(id);
    flow.merge(res.data, Product);
  };
}

function addProduct({ title, description, photos, location, price }) {
  return async (flow, store) => {
    const res = await Api.Products.add({
      title,
      description,
      photos,
      location,
      price,
    });
    store.add(res.data.id, res.data);
    return res.data;
  };
}
