const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetcher = async (endpoint, { method = "GET", body } = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const accessToken = localStorage.getItem("dominoAccessToken");
  const refreshToken = localStorage.getItem("dominoRefreshToken");

  const options = {
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
    const error = new Error(errorResponse.message || "요청 실패");

    error.status = response.status;
    throw error;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};

export default fetcher;
