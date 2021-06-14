import fetch from "isomorphic-fetch";
import { BASE_URL } from '../constants';

type ConfigType = {
  method?: string;
  token?: string;
  data? : any;
}

const api = {
  callJson: async(url: string, { data, method = 'GET', token }: ConfigType = {}) => {
    const _url = `${BASE_URL}${url}`;
    const _config = {
      method,
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(data)
    }
    if(token) {
      _config.headers["Authorization"] = `Bearer ${token}`;
    }
    return fetch(_url, _config).then(res => {
      return res.json()
    });
  },
  // callWithAuth: async(url: string, data: Record<string, any>, method = "GET") => {
  //   const _url = `${BASE_URL}${url}`;
  //   const config = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authentication": "Bearer token-cookie"
  //     },
  //     body: JSON.stringify(data)
  //   }
  //   return fetch(_url, config).then(res => res.json());
  // },
}

export default api;