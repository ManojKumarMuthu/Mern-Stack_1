import decode from 'jwt-decode';

const TOKEN_KEY = 'jwt';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const decodeToken = () => {
  const token = getToken();
  if (token) {
    return decode(token);
  }
  return null;
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  const token = getToken();
  if (token) {
    const decodedToken = decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  }
  return false;
};

