import fetch from "isomorphic-fetch";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useNotAuthen } from "../helpers/useAuthen";
import { useGlobalState } from "../state";

// import Cookies from "js-cookie";

interface FormLoginData {
  email: string;
  password: string;
}

const iniFormData: FormLoginData = {
  email: "",
  password: "",
};

const Login = () => {
  useNotAuthen();
  const router = useRouter();
  const [formData, setFormData] = useState(iniFormData);
  const [userInfo] = useGlobalState("currentUser");
  const errorString = router.query.error;

  useEffect(() => {
    if (errorString) {
      alert("Đăng nhập thất bại");
      window.history.pushState({}, document.title, "/login");
    }
  }, [errorString]);

  const handleOnChange = (key) => (evt: any) => {
    const value = evt.target.value;
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // const url = `${BASE_URL}/member/login.php`;
    // api
    //   .callJson("/member/login.php", { data: formData, method: "POST" })
    //   .then((data) => {
    //     console.log("data", data);
    //   });

    const body = JSON.stringify(formData);
    const method = "POST";

    fetch("api/login", {
      body,
      method,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data = ", data);
        // Cách 1: Set ở trình duyệt
        // Cookies.set("token", data.token, {
        //   expires: 3,
        // });
      });

    // router.push('/');
    // Cookies.remove("name3");
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    const formElement = evt.target;
    formElement.submit();
  };

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
          {/* </div><form action="/api/login" method="POST" onSubmit={handleSubmit}> */}
          <form action="/api/login" method="POST" onSubmit={handleSubmitForm}>
            <input
              // value={formData.email}
              // onChange={handleOnChange("email")}
              name="email"
              type="text"
              className="form-control"
              placeholder="Email"
              required
            />
            <input
              // value={formData.password}
              // onChange={handleOnChange("password")}
              name="password"
              type="password"
              className="form-control"
              placeholder="Mật khẩu"
              required
            />
            <div className="ass1-login__send">
              <Link href="/register">
                <a>Đăng ký một tài khoản</a>
              </Link>
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
