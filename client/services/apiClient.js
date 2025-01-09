import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "TOKEN_KEY";

const apiClient = axios.create({
  baseURL: "https://ww-1-backend-3b3852aa63dc.herokuapp.com/api",
  headers: {
    "Cache-Control": "no-cache",
  },
});

export const setToken = async (token) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (e) {
    console.log("api client 1 " + e);
  }
};

export const setUserName = async (name) => {
  await AsyncStorage.setItem("username", name);
};

export const getUserName = async () => {
  const name = await AsyncStorage.getItem("username");
  return name;
};

export const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const removeToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      console.log("api client 2" + token);
      if (
        token &&
        config.url !== "auth/signin/" &&
        config.url !== "auth/signup/"
      ) {
        // TODO: check headers
        config.headers["Authorization"] = token;
        console.log("apiclient 3 " + config.headers, "config.headers");
      }
      return config;
    } catch (e) {
      console.log("api client 4 " + e, "encrypted");
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // clear token and set isAuth to false
      try {
        await removeToken();
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await AsyncStorage.setItem("isauth", "false");
      } catch (e) {
        console.log(e);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
