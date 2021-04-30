import { PostDetailForm } from "../../components/PostDetailForm";
import { PostDetailSidebar } from "../../components/PostDetailSidebar";

export default function PostCreate() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-8">
          <PostDetailForm />
        </div>
        <div className="col-lg-4">
          <PostDetailSidebar />
        </div>
      </div>
    </div>
  )
}