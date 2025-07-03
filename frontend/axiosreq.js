// api.js -------------------------------------------------
import axios from "axios";

// OPTIONAL: if you prefer history.push over window.location,
// you can create a single‑page friendly history object instead.
// import { createBrowserHistory } from "history";
// export const history = createBrowserHistory();

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// ---------- helpers ----------
let isRefreshing = false;
let queuedRequests = [];

/** Attach token to every outbound request */
api.interceptors.request.use(cfg => {
  const token = sessionStorage.getItem("accessToken");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

/** Global 401 handler */
api.interceptors.response.use(
  res => res,                    // happy path → just return response
  async err => {
    const { config, response } = err;

    // Bail out if no 401 or we already retried this call
    if (!response || response.status !== 401 || config._retry) {
      return Promise.reject(err);
    }
    config._retry = true;

    /* ---------------- queue duplicate 401s while we're refreshing --------------- */
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queuedRequests.push({ resolve, reject });
      })
        .then(token => {
          config.headers.Authorization = `Bearer ${token}`;
          return api(config); // retry original
        })
        .catch(Promise.reject);
    }

    isRefreshing = true;
    try {
      // Attempt refresh
      const { data } = await api.post("/auth/refresh");
      const newToken = data.session;   // { session: "newAccessJWT" }

      // persist + attach new token
      sessionStorage.setItem("accessToken", newToken);
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

      // retry failed requests
      queuedRequests.forEach(p => p.resolve(newToken));
      queuedRequests = [];

      return api(config);              // retry first failed call
    } catch (refreshErr) {
      /* -------------- REFRESH FAILED → force logout & redirect --------------- */
      queuedRequests.forEach(p => p.reject(refreshErr));
      queuedRequests = [];

      sessionStorage.removeItem("accessToken");  // clear stale token

      // 1) If you are OK with a full page reload (simplest):
      window.location.replace("/authentication");              // <— redirects to '/'

      // 2) If you’d rather stay SPA‑native, inject history:
      // history.push("/");

      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
