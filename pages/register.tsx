import React, { useMemo, useState } from "react";
import { handleError } from "../helpers";
import userService from "../services/userService";
import { useGlobalState } from "../state";
import Cookies from "js-cookie";
import { useNotAuthen } from "../helpers/useAuthen";
import { Button } from "../components/Button";
import Link from "next/link";

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
  useNotAuthen();
  const [registerData, setRegisterData] = useState(initRegisterData);
  const [, setToken] = useGlobalState("token");
  const [, setUserInfo] = useGlobalState("currentUser");
  const [loading, setLoading] = useState(false);

  const isValidate = useMemo((): boolean => {
    for (let key in registerData) {
      const error = registerData[key].error;
      if (error !== "") return false;
    }
    return true;
  }, [registerData]);

  const onChangeData = (key: string) => (e: any) => {
    const value = e.target.value;
    const error = handleError(key, value, registerData.password.value);

    setRegisterData({
      ...registerData,
      [key]: {
        value,
        error,
      },
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (loading) return;
    if (!isValidate) {
      alert("Dữ liệu nhập vào không hợp lệ");
      return;
    }
    const email = registerData.email.value;
    const fullname = registerData.fullname.value;
    const password = registerData.password.value;
    const repassword = registerData.repassword.value;

    const data = {
      email,
      fullname,
      password,
      repassword,
    };
    setLoading(true);
    userService
      .register(data)
      .then((res) => {
        if (res.status === 200) {
          setToken(res.token);
          setUserInfo(res.user);
          Cookies.set("token", res.token, { expires: 30 * 12 });
        } else {
          alert(res.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="ass1-login">
      <div className="ass1-login__logo">
        <Link href={"/"}>
          <a className="ass1-logo">ZendVn Meme</a>
        </Link>
      </div>
      <div className="ass1-login__content">
        <p>Đăng ký một tài khoản</p>
        <div className="ass1-login__form">
          <form action="#" onSubmit={handleRegister}>
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
              <Link href={"/login"}>
                <a>Đăng nhập</a>
              </Link>
              <Button type="submit" className="ass1-btn" isLoading={loading}>
                Đăng ký
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
