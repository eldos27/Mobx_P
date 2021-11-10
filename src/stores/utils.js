import {
  applySnapshot,
  onSnapshot,
  types,
  getParent,
  getRoot,
  isStateTreeNode,
  getIdentifier,
  resolveIdentifier,
} from 'mobx-state-tree';
import { normalize } from 'normalizr';

export function asyncModel(thunk, auto = true) {
  const model = types
    .model('AsyncModel', {
      isLoading: false,
      isError: false,
      touched: false,
      errorCode: types.maybeNull(types.number),
    })
    .actions((store) => ({
      start() {
        store.isError = false;
        store.errorCode = null;
        store.isLoading = true;
        store.touched = true;
      },
      success() {
        store.isLoading = false;
        store.touched = true;
      },
      error(err) {
        store.isLoading = false;
        store.isError = true;

        if (err.response) {
          store.errorCode = err.response.status;
        }

        throw err;
      },
      run(...args) {
        const promise = thunk(...args)(
          store,
          getParent(store),
          getRoot(store),
        );

        if (auto) {
          return store._auto(promise);
        }

        return promise;
      },
      merge(data, schema) {
        const { entities, result } = normalize(data, schema);
        getRoot(store).entities.merge(entities);
        return result;
      },
      async _auto(promise) {
        try {
          store.start();
          const res = await promise;
          store.success();
          return res;
        } catch (err) {
          store.error(err);
        }
        return undefined;
      },
    }))
    .views((store) => ({
      get inProcessing() {
        return !store.touched || store.isLoading;
      },
    }));
  return types.optional(model, {});
}

export function createPersist(store) {
  onSnapshot(store, (snapshot) => {
    window.localStorage.setItem(
      '__persist',
      JSON.stringify({
        auth: {
          isLoggedIn: snapshot.auth.isLoggedIn,
        },
        viewer: {
          user: snapshot.viewer.user,
          userModel: snapshot.viewer.userModel,
          savedProducts: {
            itemsIds: snapshot.viewer.savedProducts.itemsIds,
            count: snapshot.viewer.savedProducts.count,
          },
        },
      }),
    );
  });

  function rehydrate() {
    const snapshot = window.localStorage.getItem('__persist');

    if (snapshot) {
      applySnapshot(store, JSON.parse(snapshot));
    }
  }

  return { rehydrate };
}

export function createCollection(ofModel, asyncModels) {
  const collection = types
    .model('CollectionModel', {
      collection: types.map(ofModel),
      ...asyncModels,
    })
    .views((store) => ({
      get(key) {
        return store.collection.get(String(key));
      },
      getArray(array) {
        return array.map((key) => store.collection.get(String(key)));
      },
    }))
    .actions((store) => ({
      add(key, value) {
        return store.collection.set(String(key), value);
      },
    }));

  return types.optional(collection, {});
}

export function safeReference(T) {
  return types.reference(T, {
    get(identifier, parent) {
      if (isStateTreeNode(identifier)) {
        identifier = getIdentifier(identifier);
      }

      return resolveIdentifier(T, parent, identifier);
    },
    set(value) {
      return value;
    },
  });
}
