
const TOKEN_KEY    = "token";
const USERNAME_KEY = "username"

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const setStoredUsername = (username: string) => {
  localStorage.setItem(USERNAME_KEY, username);
};

export const getToken = (): string => {
  return localStorage.getItem(TOKEN_KEY) || "";
};

export const getStoredUsername = () => {
  return localStorage.getItem(USERNAME_KEY) || "";
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const removeStoredUsername = () => {
  localStorage.removeItem(USERNAME_KEY);
}

export const verifyToken = (): boolean => {
  const token = getToken();
  return token.length > 0;
};
