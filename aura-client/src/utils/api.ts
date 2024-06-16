import axios from "axios";
import {
  AxeResultsType,
  Pa11yResultsType,
  AcheckerResultsType,
} from "@/lib/types";

const apiUrl = "http://localhost:3001/api";

export const fetchPa11y = (url: string) => {
  return axios
    .get(`${apiUrl}/pa11y?url=${url}`)
    .then(res => res.data as Pa11yResultsType);
};

export const fetchAxe = (url: string) => {
  return axios.get(`${apiUrl}/axe?url=${url}`).then(res => res.data);
};

export const fetchAchecker = (url: string) => {
  return axios.get(`${apiUrl}/achecker?url=${url}`).then(res => res.data);
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/",
  timeout: 240000,
  maxContentLength: 2000000000,
  maxBodyLength: 2000000000,
});
