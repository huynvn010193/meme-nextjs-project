import { BASE_URL } from '../constants';

const api = {
  callJson: (url,data, method = "GET") => {
    const _url = `${BASE_URL}${url}`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    return fetch(_url, config).then(res => res.json);
  }
}

export default api;