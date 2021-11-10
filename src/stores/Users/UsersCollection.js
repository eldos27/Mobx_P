import Api from 'src/api';
import { useStore } from 'src/stores/createStore';
import { UserModel } from './UserModel';
import { asyncModel, createCollection } from '../utils';

export const UsersCollection = createCollection(UserModel, {
  getUser: asyncModel(getUser),
});

export function useUsersCollection() {
  const store = useStore();
  return store.entities.users;
}

function getUser(id) {
  return async (flow, store) => {
    const res = await Api.User.getUser(id);
    store.add(res.data.id, res.data);
  };
}
