const axios = require("axios");
const serverURL = process.env.REACT_APP_SERVER_URI;

export function fetchLogout(token) {
  return axios.post(
    serverURL + "/logout",
    {},
    { headers: { Authorization: token } }
  );
}

export function mutateLogin(data) {
  return axios.post(serverURL + "/login", data);
}

export function fetchRefresh(token) {
  return axios.post(
    serverURL + "/login",
    {},
    { headers: { Authorization: token } }
  );
}

export function mutateSignup(data) {
  return axios.post(serverURL + "/users", data);
}

export function fetchMe(token) {
  return axios.get(serverURL + "/me", {
    headers: { Authorization: token },
  });
}
