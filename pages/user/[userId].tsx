import { UserDetailInfo } from "../../components/UserDetailInfo"
import { UserDetailPosts } from "../../components/UserDetailPosts"

const UserDetail = () => {
  return (
    <div className="container">
      <UserDetailInfo />
      <UserDetailPosts />
    </div>
  )
}

export default UserDetail;