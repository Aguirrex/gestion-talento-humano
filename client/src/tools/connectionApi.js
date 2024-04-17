import axios from 'axios';

const URL_API = process.env.REACT_APP_URL_API;

const fetchApi = () => {
  const config = {
    baseURL: URL_API,
  };

  const jwtTokenUsuario = getTokenUsuario();

  if (jwtTokenUsuario && jwtTokenUsuario !== null && jwtTokenUsuario.length > 0) {
    config.headers = {Authorization: `Bearer ${jwtTokenUsuario}`};
  }
  return axios.create(config);
};

const setTokenUsuario = (token) => {
  localStorage.setItem('token', token);
};

function getTokenUsuario() {
  return localStorage.getItem('token');
}

export {
  fetchApi,
  getTokenUsuario,
  setTokenUsuario
};