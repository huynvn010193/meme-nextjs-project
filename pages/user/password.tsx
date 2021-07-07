import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useAuthen } from "../../helpers/useAuthen";
import userService from "../../services/userService";
import { useGlobalState } from "../../state";

const initState = {
  oldPassword: "",
  newPassword: "",
  reNewPassword: "",
};
const UserChangePassword = () => {
  useAuthen();
  const [formData, setFormData] = useState(initState);
  const handleOnChange = (key: string) => (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  const [token, setToken] = useGlobalState("token");
  const [, setUserInfo] = useGlobalState("currentUser");
  const router = useRouter();

  const handleLogout = () => {
    const check = window.confirm("Thay đổi mật khẩu thành công ?");
    if (check) {
      setFormData(initState);
      Cookies.remove("token");
      setToken("");
      setUserInfo(null);
      router.push("/login");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // B1: Validate Dữ liệu
    // B2: Gọi API
    userService.changePassword(formData, token).then((res) => {
      if (res.status === 200) {
        handleLogout();
      } else {
        alert(res.error);
      }
    });
  };

  return (
    <div className="ass1-login">
      <div className="ass1-login__content">
        <p>Đổi mật khẩu</p>
        <div className="ass1-login__form">
          <form action="#" onSubmit={handleOnSubmit}>
            <input
              value={formData.oldPassword}
              onChange={handleOnChange("oldPassword")}
              type="password"
              className="form-control"
              placeholder="Mật khẩu cũ"
              required
            />
            <input
              value={formData.newPassword}
              onChange={handleOnChange("newPassword")}
              type="password"
              className="form-control"
              placeholder="Mật khẩu mới"
              required
            />
            <input
              value={formData.reNewPassword}
              onChange={handleOnChange("reNewPassword")}
              type="password"
              className="form-control"
              placeholder="Xác nhận mật khẩu mới"
              required
            />
            <div className="ass1-login__send justify-content-center">
              <button type="submit" className="ass1-btn">
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserChangePassword;
