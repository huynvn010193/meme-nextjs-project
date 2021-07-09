import fetch from "isomorphic-fetch";
import { BASE_URL } from "../constants";

type ConfigType = {
  method?: string;
  token?: string;
  data?: any;
};

type ConfigFormType = {
  data: FormData;
  token: string;
  method?: string;
};

const api = {
  callJson: async (
    url: string,
    { data, method = "GET", token }: ConfigType = {}
  ) => {
    const _url = `${BASE_URL}${url}`;
    const _config = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    if (token) {
      _config.headers["Authorization"] = `Bearer ${token}`;
    }
    return fetch(_url, _config).then((res) => {
      return res.json();
    });
  },
  callFormData: async (
    url: string,
    { data, method = "POST", token }: ConfigFormType
  ) => {
    const _url = `${BASE_URL}${url}`;
    const _config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: data,
    };
    return fetch(_url, _config).then((res) => {
      return res.json();
    });
  },
};

export default api;
