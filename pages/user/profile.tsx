import { useState, useRef } from "react";
import { useGlobalState } from "../../state";

const UserProfile = () => {
  const [currentUser] = useGlobalState("currentUser");
  const [user, setUser] = useState(currentUser);
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
    console.log(e.target.files);
    // Không cho phép chọn nhiều file
    const listFiles = e.target.files;
    if (listFiles.length === 0) return;
    const file = listFiles[0] as File;
    if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
      console.log("hợp lệ");
    } else {
      alert("File không hợp lệ");
    }
  };
  return (
    <div className="ass1-login">
      <div className="ass1-login__content">
        <p>Profile</p>
        <div className="ass1-login__form">
          <div className="avatar" onClick={handleClickSelectFile}>
            <img src={user.profilepicture || "/images/avatar-02.png"} alt="" />
          </div>
          <form action="#">
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
