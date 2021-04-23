import Head from "next/head";
import { HomeSidebar } from "../components/HomeSidebar";
import { PostItemList } from "../components/PostListItem";

export default function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostItemList />
        </div>
        <div className="col-lg-4">
          <HomeSidebar />
        </div>
      </div>
    </div>
  );
}
