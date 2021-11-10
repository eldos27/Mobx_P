import { getRoot, types } from 'mobx-state-tree';
import { UserModel } from '../Users/UserModel';
import { safeReference } from '../utils';

export const ProductModel = types
  .model('ProductModel', {
    id: types.identifierNumber,
    ownerId: types.number,
    title: types.string,
    description: types.maybeNull(types.string),
    photos: types.maybeNull(types.array(types.string)),
    location: types.string,
    price: types.number,
    createdAt: types.string,
    updatedAt: types.string,
    owner: types.maybe(safeReference(types.late(() => UserModel))),
  })
  .actions((store) => ({
    setSaved(value) {
      store.saved = value;
    },
  }))
  .views((store) => ({
    get saved() {
      return getRoot(store).viewer.savedProducts.has(store.id);
    },
  }));
