import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/*",
  timeout: 240000,
  maxContentLength: 2000000000,
  maxBodyLength: 2000000000,
});

export async function getAxeResults(url: string) {
  const api = "http://localhost:3001/api";
  console.log("Fetching data from:", api);

  try {
    const response = await axiosInstance.get(
      `${api}/axe-results?url=${encodeURIComponent(url)}`
    );
    console.log("Data fetched:");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}

export async function getPA11YResults(url: string) {
  const api = "http://localhost:3001/api";
  console.log("Fetching data from:", api);

  try {
    const response = await axiosInstance.get(
      `${api}/pa11y-results?url=${encodeURIComponent(url)}`
    );
    console.log("Data fetched:");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}
