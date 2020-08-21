import jwtDecode from "jwt-decode";
import http from "./httpService";
import commons from "../config/commonConstants";
import utils from "../helpers/utils";

const tokenKey = "token";

http.setJwt(getJwt());

export async function loginUser(email, password) {
  const { data: jwt } = await http.post(`${commons.API_URL}/api/login`, {
    email,
    password
  });
  utils.storeAsyncStorageData(tokenKey, jwt);
  return jwt;
}

export function logout() {
  utils.removeAsyncStorageData(tokenKey);
}

export function loginWithjwt(jwt) {
  utils.storeAsyncStorageData(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = utils.fetchAsyncStorageData(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return utils.fetchAsyncStorageData(tokenKey);
}

export async function forgotPassword(email) {
  if (!email) return;
  const { data } = await http.post(
    `${commons.API_URL}/api/login/forgotPassword/${email}`
  );
  return data;
}

export async function checkTemporaryPwd(username, tempPwd) {
  const { data } = await http.post(
    `${commons.API_URL}/api/login/checkTempPassword`,
    {
      username,
      tempPassword: tempPwd
    }
  );
  return data;
}

export async function createNewPassword(username, tempPassword, newPassword) {
  const { data } = await http.post(
    `${commons.API_URL}/api/login/createNewPassword/`,
    {
      username,
      tempPassword,
      newPassword
    }
  );
  return data;
}

export default {
  loginUser,
  loginWithjwt,
  logout,
  getCurrentUser,
  getJwt,
  forgotPassword,
  checkTemporaryPwd,
  createNewPassword
};
