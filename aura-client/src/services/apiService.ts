import axios from "axios";
const api = "http://localhost:3001/api";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/*",
  timeout: 240000,
  maxContentLength: 2000000000,
  maxBodyLength: 2000000000,
});

export async function getAxeResults(url: string) {
  console.log("Fetching data from aXe:", api);

  try {
    const response = await axiosInstance.get(
      `${api}/axe-results?url=${encodeURIComponent(url)}`
    );
    console.log("Data fetched aXe:");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}

export async function getPA11YResults(url: string) {
  console.log("Fetching data from pa11y:", api);

  try {
    const response = await axiosInstance.get(
      `${api}/pa11y-results?url=${encodeURIComponent(url)}`
    );
    console.log("Data fetched pa11y:");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}

export async function getAcheckerResults(url: string) {
  console.log("Fetching data from Achecker:", api);

  try {
    const response = await axiosInstance.get(
      `${api}/achecker-results?url=${encodeURIComponent(url)}`
    );
    console.log("Data fetched Achecker:");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}
