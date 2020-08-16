import http from "./httpService";
import commons from "../config/commonConstants";

export async function registerUser({ fName, lName, email, password }) {
  const result = await http.post(`${commons.API_URL}/api/register`, {
    username: `${fName} ${lName}`,
    emailId: email,
    password
  });
  return result;
}

export default { registerUser };
