import axios from "axios";
let axiosinstance = axios.create({
  baseURL: "  http://localhost:3000",
});

export default axiosinstance;
