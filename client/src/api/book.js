const axios = require("axios");

const serverURL = process.env.REACT_APP_SERVER_URI;
const googleURL = process.env.REACT_APP_GOOGLE_URI;
const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;

export function fetchBookById(id) {
  return axios.get(`${googleURL}/volumes/${id}?key=${googleKey}`);
}

export function fetchBookByIdFromLocalServer(token, bid) {
  return axios.get(`${serverURL}/books/bid/${bid}`, {
    headers: { Authorization: token },
  });
}

export function mutateStoreBook(token, data) {
  return axios.post(serverURL + "/books", data, {
    headers: { Authorization: token },
  });
}
