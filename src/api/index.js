/**
 * Created by ebinhon on 1/19/2017.
 */
const host = 'https://api.github.com';

const userEndpoint = 'users';

const API = {
  /**
   * @return {string}
   */
  FETCH_USER(id) {
    return id ? `${host}/${userEndpoint}/${id}` : `${host}/${userEndpoint}`;
  }
};

export default API;
