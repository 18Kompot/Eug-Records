import { getToken, verifyToken } from "./storage";

const serverUrl = "http://localhost:3000/";

const handleRequest = (
  url: string,
  method: string,
  headers?: HeadersInit,
  data?: object,
  checkToken = true
): Promise<Response> | null => {
  if (checkToken && !verifyToken()) {
    return null;
  }

  const config = {
    method,
    headers: {
      ...headers,
      "x-auth-token": getToken(),
    },
    body: data ? JSON.stringify(data) : null,
  };

  return fetch(url, config);
};

export const getRequest = (
  endPoint: string,
  checkToken: boolean = true
): Promise<Response> | null => {
  return handleRequest(
    `${serverUrl}${endPoint}`,
    "GET",
    undefined,
    undefined,
    checkToken
  );
};

export const postRequest = (
  endPoint: string,
  data: object,
  checkToken?: boolean
): Promise<Response> | null => {
  return handleRequest(
    `${serverUrl}${endPoint}`,
    "POST",
    { "Content-Type": "application/json" },
    data,
    checkToken
  );
};

export const patchRequest = (
  endPoint: string,
  data: object
): Promise<Response> | null => {
  return handleRequest(
    `${serverUrl}${endPoint}`,
    "PATCH",
    { "Content-Type": "application/json" },
    data
  );
};

export const deleteRequest = (endPoint: string): Promise<Response> | null => {
  return handleRequest(`${serverUrl}${endPoint}`, "DELETE");
};
