import { types } from 'mobx-state-tree';
import { AuthStore } from './Auth/AuthStore';
import { ViewerStore } from './ViewerStore';
import { LatestProductsStore } from './Products/LatestProductsStore';
import { SearchProductsStore } from './Products/SearchProductsStore';
import { EntitiesStore } from './EntitiesStore';

export const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),
    latestProducts: types.optional(LatestProductsStore, {}),
    searchProducts: types.optional(SearchProductsStore, {}),
    entities: types.optional(EntitiesStore, {}),
  })
  .actions((store) => ({
    async bootstrap() {
      const token = window.localStorage.getItem('___token');

      if (token) {
        await store.viewer.getViewer(token);
      }

      store.viewer.savedProducts.fetch.run();
    },
  }));
