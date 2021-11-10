import { types, getRoot } from 'mobx-state-tree';
import { UserModel } from './Users/UserModel';
import Api from '../api';
import { safeReference } from './utils';
import { SavedProducts } from './Products/SavedProductsStore';

const ViewerModel = UserModel.named('ViewerModel');

export const ViewerStore = types
  .model('ViewerStore', {
    user: types.maybe(safeReference(ViewerModel)),
    userModel: types.maybe(ViewerModel),
    savedProducts: types.optional(SavedProducts, {}),
    isLoading: false,
  })

  .actions((store) => ({
    async getViewer(token) {
      const Root = getRoot(store);

      try {
        Api.Auth.setToken(token);
        store.setLoading(true);

        const res = await Api.User.getAccount();

        Root.auth.setIsLoggedIn(true);
        Root.entities.users.add(res.data.id, res.data);
        store.setViewer(res.data);
      } catch (e) {
        console.log(e);
        Root.auth.logout();
      }

      store.setLoading(false);
    },
    setViewer(user) {
      store.user = user?.id;
      store.userModel = user;
    },
    setLoading(bool) {
      store.isLoading = bool;
    },
  }));
