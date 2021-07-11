import router from "next/router";
import { useState, useRef } from "react";
import userService from "../../services/userService";
import { useGlobalState } from "../../state";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useGlobalState("currentUser");
  const [user, setUser] = useState(currentUser);
  const [objFile, setObjFile] = useState({ file: null, base64URL: "" });
  const [token] = useGlobalState("token");
  const handleOnchange = (key: string) => (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [key]: value,
    });
  };
  const inputFileEl = useRef(null);
  const handleClickSelectFile = () => {
    inputFileEl.current.click();
  };
  const handleChangeFile = (e) => {
    // Không cho phép chọn nhiều file
    const listFiles = e.target.files;
    if (listFiles.length === 0) return;
    const file = listFiles[0] as File;
    if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          setObjFile({
            file,
            base64URL: reader.result as string,
          });
        },
        false
      );
      reader.readAsDataURL(file);
    } else {
      alert("File không hợp lệ");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullname: user.fullname,
      gender: user.gender,
      description: user.description,
      avatar: objFile.file,
    };
    userService.updateProfile(data, token).then((res) => {
      if (res.status === 200) {
        setCurrentUser(res.user);
        alert("Thay đổi thông tin profile thành công");
        router.push(`/user/${currentUser.USERID}`);
      } else {
        alert(res.error);
      }
    });
  };

  const avatarURL =
    objFile.base64URL || user.profilepicture || "/images/avatar-02.png";
  return (
    <div className="ass1-login">
      <div className="ass1-login__content">
        <p>Profile</p>
        <div className="ass1-login__form">
          <div className="avatar" onClick={handleClickSelectFile}>
            <img src={avatarURL} alt="" />
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <input
              value={user.fullname}
              onChange={handleOnchange("fullname")}
              type="text"
              className="form-control"
              placeholder="Tên ..."
              required
            />
            <select
              className="form-control"
              onChange={handleOnchange("gender")}
              value={user.gender}
            >
              <option value="Gioitinh">Giới tính</option>
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
            </select>
            <input
              ref={inputFileEl}
              style={{ display: "none" }}
              type="file"
              name="avatar"
              placeholder="Ảnh đại diện"
              className="form-control"
              onChange={handleChangeFile}
            />
            <textarea
              className="form-control"
              cols={30}
              rows={5}
              placeholder="Mô tả ngắn ..."
              value={user.description}
              onChange={handleOnchange("description")}
            />
            <div className="ass1-login__send justify-content-center">
              <button type="submit" className="ass1-btn">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
