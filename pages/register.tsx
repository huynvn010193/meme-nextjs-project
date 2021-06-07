import { useState } from "react";

const initRegisterData = {
  fullname: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  password: {
    value: "",
    error: "",
  },
  repassword: {
    value: "",
    error: "",
  },
};

const Register = () => {
  const [registerData, setRegisterData] = useState(initRegisterData);

  const onChangeData = (key: string) => (e: any) => {
    let error = "";
    const value = e.target.value;

    setRegisterData({
      ...registerData,
      [key]: {
        value,
        error,
      },
    });
  };

  return (
    <div className="ass1-login">
      <div className="ass1-login__logo">
        <a href="index.html" className="ass1-logo">
          ZendVn Meme
        </a>
      </div>
      <div className="ass1-login__content">
        <p>Đăng ký một tài khoản</p>
        <div className="ass1-login__form">
          <form action="#">
            <div className="form-group">
              <input
                onChange={onChangeData("fullname")}
                value={registerData.fullname.value}
                type="text"
                className="form-control"
                placeholder="Tên hiển thị"
              />
              {registerData.fullname.error && (
                <small
                  className="form-text text-danger"
                  style={{ textAlign: "left" }}
                >
                  {registerData.fullname.error}
                </small>
              )}
            </div>
            <div className="form-group">
              <input
                onChange={onChangeData("email")}
                value={registerData.email.value}
                type="email"
                className="form-control"
                placeholder="Email"
              />
              {registerData.email.error && (
                <small
                  className="form-text text-danger"
                  style={{ textAlign: "left" }}
                >
                  {registerData.email.error}
                </small>
              )}
            </div>
            <div className="form-group">
              <input
                onChange={onChangeData("password")}
                value={registerData.password.value}
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
              />
              {registerData.password.error && (
                <small
                  className="form-text text-danger"
                  style={{ textAlign: "left" }}
                >
                  {registerData.password.error}
                </small>
              )}
            </div>
            <div className="form-group">
              <input
                onChange={onChangeData("repassword")}
                value={registerData.repassword.value}
                type="password"
                className="form-control"
                placeholder="Nhập lại mật khẩu"
              />
              {registerData.repassword.error && (
                <small
                  className="form-text text-danger"
                  style={{ textAlign: "left" }}
                >
                  {registerData.repassword.error}
                </small>
              )}
            </div>
            <div className="ass1-login__send">
              <a href="dang-nhap.html">Đăng nhập</a>
              <button type="submit" className="ass1-btn">
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
