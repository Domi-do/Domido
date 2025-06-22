import { API_PATHS } from "@/constants/apiPaths";
import { HTTPError } from "@/utils/HTTPError";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface FetcherOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  headers?: HeadersInit;
}

const fetcher = async (endpoint: string, { method = "GET", body }: FetcherOptions = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const accessToken = localStorage.getItem("dominoAccessToken");
  const refreshToken = localStorage.getItem("dominoRefreshToken");

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "refresh-token": `Bearer ${refreshToken}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  const newAccessToken = response.headers.get("Authorization")?.split(" ")[1];

  if (newAccessToken) {
    localStorage.setItem("dominoAccessToken", newAccessToken);
  }

  if (!response.ok) {
    const errorResponse = await response.json().catch(() => ({}));
    throw new HTTPError(response.status, "요청 실패");
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};

export default fetcher;
