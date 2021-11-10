/* eslint-disable no-undef */
import axios from 'axios';

const queryString = require('query-string');

export const Auth = {
  _token: null,

  getToken() {
    return this._token;
  },

  setToken(token) {
    this._token = token;
    window.localStorage.setItem('___token', token);
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  },

  isLoggedIn() {
    return !!this._token;
  },

  login({ email, password }) {
    return axios.post('/api/auth/login', { email, password });
  },

  logout() {
    this._token = null;
    window.localStorage.removeItem('___token');
    axios.defaults.headers.common.authorization = undefined;
  },

  register({ email, password, fullName }) {
    return axios.post('/api/auth/register', {
      email,
      password,
      fullName,
    });
  },
};

export const Images = {
  upload(images) {
    return Promise.all(
      images.map(async (image) => {
        if (image instanceof File) {
          const formData = new FormData();
          formData.append('image', image);
          const res = await axios.post(
            '/api/upload/images',
            formData,
          );
          return res.data;
        }
        return image;
      }),
    );
  },
};

export const User = {
  getAccount() {
    return axios.get('/api/account');
  },
  getUser(id) {
    return axios.get(`/api/users/${id}`);
  },
  async save({ fullName, phone, location, avatar }) {
    const images = await Images.upload([avatar]);
    return axios.put('/api/account', {
      fullName,
      phone,
      location,
      avatar: images[0],
    });
  },
  getProducts(id) {
    return axios.get(`/api/users/${id}/products`);
  },
};

export const Products = {
  async add({ title, description, photos = [], location, price }) {
    return axios.post('api/products', {
      title,
      description,
      photos: await Images.upload(photos),
      location,
      price,
    });
  },
  getSearch({ keyword, location }) {
    const query = queryString.stringify({ keyword, location });
    return axios.get(`/api/products/search?${query}`);
  },
  getLatest() {
    return axios.get('/api/products/latest');
  },
  getById(id) {
    return axios.get(`/api/products/${id}`);
  },
  getCollectionById(ids) {
    return axios.get(
      `/api/products/ids?${ids.map((id) => `id=${id}`).join('&')}`,
    );
  },
  getSaved() {
    return axios.get('/api/products/saved');
  },
  addToSaved(id) {
    return axios.post(`/api/products/${id}/saved`);
  },
  addCollectionToSaved(ids) {
    return axios.post('/api/products/saved', {
      ids,
    });
  },
  removeFromSaved(id) {
    return axios.delete(`/api/products/${id}/saved`);
  },
};
