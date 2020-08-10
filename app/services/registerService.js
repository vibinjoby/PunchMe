import http from "./httpService";
import commons from "../config/commonConstants";

export async function registerUser({ fName, lName, email, password }) {
  try {
    const result = await http.post(`${commons.API_URL}/api/register`, {
      username: `${fName} ${lName}`,
      emailId: email,
      password
    });
    return result;
  } catch (error) {
    console.log("came here");
    throw error;
  }
}

export default { registerUser };
