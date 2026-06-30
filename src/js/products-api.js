import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, ITEM_PER_PAGE } from './constants';
axios.defaults.baseURL = API_BASE_URL;

async function getCategories() {
  const { data } = await axios.get(API_ENDPOINTS.CATEGORIES);
  return data;
}
// function getProducts() {
//   return axios.get(API_ENDPOINTS.PRODUCTS).then(({ data }) => {
//     console.log(data);

//     return data.products;
//   });
// }
async function getProducts(page = 1) {
  const skip = (page - 1) * ITEM_PER_PAGE;
  const params = {
    limit: ITEM_PER_PAGE,
    skip,
  };
  const { data } = await axios.get(API_ENDPOINTS.PRODUCTS, { params });
  return data;
}
// function getProductsByCategory(category) {
//   return axios(`${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${category}`).then(
//     ({ data }) => {
//       return data;
//     }
//   );
// }
async function getProductsByCategory(category) {
  const { data } = await axios(
    `${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${category}`
  );
  return data;
}
async function getProductById(id) {
  const { data } = await axios(`${API_ENDPOINTS.PRODUCT_BY_ID}${id}`);
  return data;
}
async function getProductsByValue(searchValue) {
  const { data } = await axios.get(
    `${API_ENDPOINTS.PRODUCTS_BY_SEARCH}?q=${searchValue}`
  );
  return data;
}
async function getProductsByIds(ids) {
  const promises = ids.map(id => getProductById(id));
  return Promise.all(promises);
}
export {
  getProductsByValue,
  getCategories,
  getProducts,
  getProductsByCategory,
  getProductById,
  getProductsByIds,
};
