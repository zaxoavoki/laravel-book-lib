const axios = require("axios");
const serverURL = process.env.REACT_APP_SERVER_URI;

export function mutateStoreReview(token, data) {
  return axios.post(serverURL + "/reviews", data, {
    headers: { Authorization: token },
  });
}

export function mutateDeleteReview(token, id) {
  return axios.delete(serverURL + "/reviews/" + id, {
    headers: { Authorization: token },
  });
}
