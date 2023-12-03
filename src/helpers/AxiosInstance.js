import axios from "axios";
let axiosinstance = axios.create({
  baseURL: "  http://localhost:3001",
});

export default axiosinstance;
