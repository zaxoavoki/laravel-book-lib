const axios = require('axios');
const serverURL = process.env.REACT_APP_SERVER_URI;

export function mutateUser(id, token, data) {
  return axios.patch(serverURL + '/users/' + id, data, {
    headers: { Authorization: token }
  });
}

export function fetchUser(token, id) {
  return axios.get(serverURL + '/users/' + id, {
    headers: { Authorization: token }
  });
}