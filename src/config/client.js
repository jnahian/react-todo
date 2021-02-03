import axios from "axios";
import {API} from "./api";

const Client = () => {
  return axios.create({
    baseURL: API.BASE_URL
  });
}

export default Client;
