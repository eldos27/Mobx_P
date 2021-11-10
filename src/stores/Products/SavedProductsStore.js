import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { asyncModel } from '../utils';
import { ProductModel } from './ProductModel';
import { Product } from '../schemas';

export const SavedProducts = types
  .model('SavedProductsStore', {
    items: types.array(types.reference(ProductModel)),
    itemsIds: types.array(types.number),
    fetch: asyncModel(fetch),
    addToSaved: asyncModel(addToSaved),
    removeFromSaved: asyncModel(removeFromSaved),
    saveAll: asyncModel(saveAll),
  })
  .actions((store) => ({
    cleanItems() {
      store.items = [];
      store.itemsIds = [];
    },
    setItems(items) {
      store.items = items;
      store.itemsIds = items;
    },
    addItem(item) {
      store.items.push(item);
      store.itemsIds.push(item.id);
    },
    removeItem(item) {
      const index = store.items.findIndex((i) => i === item);
      store.items.splice(index, 1);
      store.itemsIds.splice(index, 1);
    },
    toggleItem(item) {
      if (!item.saved) {
        store.addToSaved.run(item, false);
      } else {
        store.removeFromSaved.run(item, false);
      }
    },
  }))
  .views((store) => ({
    get isLoading() {
      return (
        store.addToSaved.isLoading || store.removeFromSaved.isLoading
      );
    },
    get count() {
      return store.itemsIds.length;
    },
    has(id) {
      return store.itemsIds.includes(id);
    },
  }));

function addToSaved(item) {
  return async (flow, store, Root) => {
    try {
      store.addItem(item);
      if (Root.auth.isLoggedIn) {
        await Api.Products.addToSaved(item.id);
      }
    } catch (e) {
      store.removeItem(item);
    }
  };
}

function removeFromSaved(item) {
  return async (flow, store, Root) => {
    try {
      store.removeItem(item);
      if (Root.auth.isLoggedIn) {
        await Api.Products.removeFromSaved(item.id);
      }
    } catch (e) {
      store.addItem(item);
    }
  };
}

function saveAll() {
  return async (flow, store) => {
    return Api.Products.addCollectionToSaved(store.itemsIds);
  };
}

function fetch() {
  return async (flow, store, Root) => {
    let res;

    if (Root.auth.isLoggedIn) {
      res = await Api.Products.getSaved();
    } else if (store.count) {
      res = await Api.Products.getCollectionById(store.itemsIds);
    }

    store.setItems(res ? flow.merge(res.data, [Product]) : []);
  };
}
