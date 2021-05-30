import { BASE_URL } from '../constants';

const api = {
  callJson: async(url: string, data: Record<string, any>, method = "GET") => {
    const _url = `${BASE_URL}${url}`;
    const config = {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    return fetch(_url, config).then(res => {
      return res.json()
    });
  },
  callWithAuth: async(url: string, data: Record<string, any>, method = "GET") => {
    const _url = `${BASE_URL}${url}`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authentication": "Bearer token-cookie"
      },
      body: JSON.stringify(data)
    }
    return fetch(_url, config).then(res => res.json());
  },
}

export default api;