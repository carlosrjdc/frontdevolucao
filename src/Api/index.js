import axios from "axios";

const Axios = axios.create({
  baseURL: "https://backdevolucao.vercel.app//",
  timeout: 20000,
  headers: { "X-Custom-Header": "foobar" },
});

export default Axios;
