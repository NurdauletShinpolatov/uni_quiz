import axios from "axios";
import { standaloneToast } from "../../App";
import authStore from "../../store/auth.store";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 100000,
});

const errorHandler = (error, hooks) => {
  if (error?.response?.status === 401) {
    authStore.logout();
  }

  if (error?.response) {
    if (error.response?.data?.data) {
      standaloneToast({
        title: `REQUEST FAILED (${error.response.status})`,
        description: JSON.stringify(error.response.data.data),
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      standaloneToast({
        title: "REQUEST FAILED",
        // description: `Status code: ${error.response.status}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  } else {
    standaloneToast({
      title: "REQUEST FAILED",
      description: "",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  return Promise.reject(error.response);
};

httpRequest.interceptors.request.use((config) => {
  const variable = JSON.parse(window.localStorage.getItem("persist:auth"));
  const token = variable?.token?.slice(1, -1);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers.Authorization =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfcGxhdGZvcm1faWQiOiIiLCJjbGllbnRfdHlwZV9pZCI6Ijg4ZmNiZGJiLWFjOTUtNDBhNi1hMGRmLTZhMzQwNTNmOTVlNCIsImRhdGEiOiJhZGRpdGlvbmFsIGpzb24gZGF0YSIsImV4cCI6MTY5ODkwMTcxMywiaWF0IjoxNjk4ODE1MzEzLCJpZCI6IjU0NmY3NTBjLTA2YzktNGJmMS05ODQyLWY0NTU5MTgwOWJiNiIsImlwIjoiYWRkaXRpb25hbCBqc29uIGRhdGEiLCJsb2dpbl90YWJsZV9zbHVnIjoidXNlciIsInByb2plY3RfaWQiOiI0ZGJmYjkwNy04YjRiLTQ2MGItOTA2Yi1jYzgxYzU4ZTY1NmMiLCJyb2xlX2lkIjoiNmE2NDlkZmItNWZjOC00ODU5LTljOWItMzk0NDJjMGNkODgwIiwidGFibGVzIjpbXSwidXNlcl9pZCI6ImZiYjgzODliLTJiZTQtNDEzMi1iZTJmLTFmMDUxZmNhNTZlZiJ9.kqE8sRlsE57uV99Mj9-Ys_Ymp4WweFrhU2IQF03Y2Cg";
  }

  const queryParams = {
    "project-id": "4dbfb907-8b4b-460b-906b-cc81c58e656c",
  };

  const queryString = Object.entries(queryParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  config.url += `?${queryString}`;

  return config;
});

httpRequest.interceptors.response.use(
  (response) => response.data,
  errorHandler
);

export default httpRequest;
