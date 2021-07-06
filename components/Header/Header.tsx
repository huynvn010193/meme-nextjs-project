import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import HeaderSearch from "./HeaderSearch";
import { useGlobalState } from "../../state";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useGlobalState("currentUser");
  const [, setToken] = useGlobalState("token");
  const handleLogout = () => {
    const check = window.confirm("Bạn có thực sự muốn logout hay không ?");
    if (check) {
      Cookies.remove("token");
      setToken("");
      setUserInfo(null);
      router.push("/login");
    }
  };

  return (
    <header>
      <div className="ass1-header">
        <div className="container">
          <Link href={"/"}>
            <a className="ass1-logo">ZendVn Meme</a>
          </Link>
          <HeaderMenu />
          <HeaderSearch />
          <a href="#" className="ass1-header__btn-upload ass1-btn">
            <i className="icon-Upvote" /> Upload
          </a>
          {userInfo ? (
            <div className="wrapper-user">
              <Link href="/user/[userId]" as={`/user/${userInfo?.USERID}`}>
                <a className="user-header">
                  <span className="avatar">
                    <img
                      src={userInfo.profilepicture || "images/avatar-02.png"}
                      alt="avatar"
                    />
                  </span>
                  <span className="email">{userInfo.email}</span>
                </a>
              </Link>
              <div className="logout" onClick={handleLogout}>
                Logout
              </div>
            </div>
          ) : (
            <Link href="/login">
              <a className="ass1-header__btn-upload ass1-btn">Login</a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
