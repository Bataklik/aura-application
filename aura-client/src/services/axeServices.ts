import axios from "axios";

export async function getAxeResults(url: string) {
  const api = "http://localhost:3001/api";
  console.log("Fetching data from:", api);

  try {
    const response = await axios.get(
      `${api}/axe-results?url=${encodeURIComponent(url)}`
    );
    console.log("Data fetched:");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}
