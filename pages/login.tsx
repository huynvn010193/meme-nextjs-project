import { useState } from "react";
import fetch from 'isomorphic-fetch';
import { BASE_URL } from '../constants';

interface FormLoginData {
  email: string;
  password: string;
}

const iniFormData: FormLoginData = {
  email: "",
  password: "",
};



const Login = () => {
  const [formData, setFormData] = useState(iniFormData);

  const handleOnChange = (key) => (evt: any) => {
    const value = evt.target.value;
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const url = `${BASE_URL}/member/login.php`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch(url, config)
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
      })
  }

  return (
    <div className="ass1-login">
      <div className="ass1-login__logo">
        <a href="index.html" className="ass1-logo">
          Meme Project
        </a>
      </div>
      <div className="ass1-login__content">
        <p>Đăng nhập</p>
        <div className="ass1-login__form">
          <form action="#" onSubmit={handleSubmit}>
            <input
              value={formData.email}
              onChange={handleOnChange("email")}
              type="text"
              className="form-control"
              placeholder="Email"
              required
            />
            <input
              value={formData.password}
              onChange={handleOnChange("password")}
              type="password"
              className="form-control"
              placeholder="Mật khẩu"
              required
            />
            <div className="ass1-login__send">
              <a href="dang-ky.html">Đăng ký một tài khoản</a>
              <button type="submit" className="ass1-btn">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
