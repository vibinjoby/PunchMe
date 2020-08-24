import http from "./httpService";
import commons from "../config/commonConstants";

async function getLogs() {
  const result = await http.get(`${commons.API_URL}/api/log/view`);
  return result;
}

export default { getLogs };
