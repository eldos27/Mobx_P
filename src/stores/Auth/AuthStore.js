import { getRoot, types } from 'mobx-state-tree';
import Api from 'src/api';
import { asyncModel } from '../utils';

export const AuthStore = types
  .model('AuthStore', {
    login: asyncModel(loginFlow),
    register: asyncModel(registerFlow),
    saveAccount: asyncModel(saveAccountFlow),
    isLoggedIn: false,
  })
  .actions((store) => ({
    setIsLoggedIn(value = true) {
      store.isLoggedIn = value;
    },
    logout() {
      const Root = getRoot(store);
      Api.Auth.logout();
      store.setIsLoggedIn(false);
      Root.viewer.savedProducts.cleanItems();
      Root.viewer.setViewer();
    },
  }));

function loginFlow({ password, email }) {
  return async (flow, store, Root) => {
    const res = await Api.Auth.login({ email, password });

    Api.Auth.setToken(res.data.token);
    Root.auth.setIsLoggedIn(true);
    Root.viewer.savedProducts.cleanItems();
    Root.viewer.setViewer(res.data.user);
    Root.viewer.savedProducts.fetch.run();
  };
}

function registerFlow({ fullName, email, password }) {
  return async (flow, store, Root) => {
    const res = await Api.Auth.register({
      fullName,
      email,
      password,
    });

    Api.Auth.setToken(res.data.token);
    Root.auth.setIsLoggedIn(true);
    Root.viewer.setViewer(res.data.user);
    Root.viewer.savedProducts.saveAll.run();
  };
}

function saveAccountFlow({
  fullName,
  phone,
  location,
  avatar = null,
}) {
  return async (flow, store, Root) => {
    const res = await Api.User.save({
      fullName,
      phone,
      location,
      avatar,
    });

    Root.viewer.setViewer(res.data);
    Root.entities.users.add(res.data.id, res.data);
  };
}
