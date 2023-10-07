import axios from "axios";
import { API_NOTIFICATION_MESSAGES } from "../Config/ApiNotificationMessages";

export const axiosInstances = axios.create({
  timeout: 20000,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstances.interceptors.request.use(
  function (config) {
    // const state = store.getState();
    // const token = state?.user?.token;
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
);

axiosInstances.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

export const axiosMultipartInstances = axios.create({
  timeout: 20000,
  headers: {
    "content-type": "multipart/form-data",
  },
});

axiosMultipartInstances.interceptors.request.use(
  function (config) {
    // const state = store.getState();
    // const token = state?.user?.token;
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosMultipartInstances.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

// in case of success -> return {isSuccess:true, data:obj}
// in case of error -> return {isFailure:true, status:int, message:str}
function processResponse(response) {
  if (response?.status === 201) {
    return {
      isSuccess: true,
      data: response?.data,
    };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      message: response?.message,
    };
  }
}

function processError(error) {
  if (error.response) {
    // request made and server responded with an error
    console.log("ERROR IN RESPONSE: ", error);
    return {
      isError: true,
      message:
        error.response.data.message ||
        API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    // request made but no response receive may be forntend not connected with backend
    console.log("ERROR IN REQUEST: ", error);
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    //something happened while requesting which triggered an error
    console.log("ERROR IN NETWORK: ", error);
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
}
