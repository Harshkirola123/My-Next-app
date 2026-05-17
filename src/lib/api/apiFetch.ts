export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem("accessToken");

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // Access token expired
  if (response.status === 401) {
    const refreshResponse = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    // Refresh failed
    if (!refreshResponse.ok) {
      localStorage.removeItem("accessToken");

      window.location.href = "/login";

      throw new Error("Session expired");
    }

    const refreshData = await refreshResponse.json();

    // Save new access token
    localStorage.setItem("accessToken", refreshData.accessToken);

    // Retry original request
    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${refreshData.accessToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  return response;
};
