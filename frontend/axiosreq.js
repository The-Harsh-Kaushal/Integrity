// api.js -------------------------------------------------
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,       // send refresh cookie, if you use one
});

// ---------- helpers ----------
let isRefreshing = false;
let queuedRequests = [];

/** Attach token to outbound request */
api.interceptors.request.use(cfg => {
  const token = sessionStorage.getItem("accessToken");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

/** Handle 401 responses */
api.interceptors.response.use(
  res => res,                          // happy path → just return
  async err => {
    const { config, response } = err;

    // Only deal with 401 once per request
    if (!response || response.status !== 401 || config._retry) {
      return Promise.reject(err);
    }
    config._retry = true;              // mark so we don't loop forever

    // ----- queue logic -----
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queuedRequests.push({ resolve, reject });
      })
        .then(token => {
          config.headers.Authorization = `Bearer ${token}`;
          return api(config);          // retry original request
        })
        .catch(Promise.reject);
    }

    isRefreshing = true;
    try {
      // hit refresh endpoint (expects refresh cookie or refresh‑token header)
      const { data } = await api.post("/auth/refresh"); // returns { token: "newJWT" }
      const newToken = data.session;

      sessionStorage.setItem("accessToken", newToken);
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

      // flush queued requests
      queuedRequests.forEach(p => p.resolve(newToken));
      queuedRequests = [];
      return api(config);              // retry original request
    } catch (refreshErr) {
      queuedRequests.forEach(p => p.reject(refreshErr));
      queuedRequests = [];
      return Promise.reject(refreshErr); // bubble up (user must re‑login)
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
