export const apiFetch = async (url: string, options: RequestInit = {}) => {
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
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
      window.location.href = "/login";

      throw new Error("Session expired");
    }

    await refreshResponse.json();

    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  return response;
};
