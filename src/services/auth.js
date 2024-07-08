import { jwtDecode } from "jwt-decode";
//import { BASE_PATH_SERVER } from './config';
//import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';

const willExpireToken = (token) => {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;

  return now > exp;
};

export const logout = () => {
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
};

export const getAccessTokenApi = () => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  console.log(accessToken)
  if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
    return null;
  }
  return accessToken;
};


export const refreshAccessTokenApi = (refreshToken) => {
  const url = `${"BASE_PATH_SERVER"}refresh-access-token`;
  const bodyObj = {
    refreshToken,
  };
  const params = {
    method: 'POST',
    body: JSON.stringify(bodyObj),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(url, params)
    .then((response) => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    })
    .then((result) => {
      if (result.error) {
        logout();
        return false;
      }
      localStorage.setItem("ACCESS_TOKEN", result.accessToken);
      localStorage.setItem("REFRESH_TOKEN", result.refreshToken);
      return true;
    });
};
