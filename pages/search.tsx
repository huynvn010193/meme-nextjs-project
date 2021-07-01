import { useRouter } from "next/router";
import { useEffect } from "react";

const SearchPage = () => {
  const router = useRouter();
  const searchStr = router.query.q || "";
  useEffect(() => {
    if (!searchStr) {
      router.push("/");
    }
  }, [searchStr]);
  return <h1>SearchPage</h1>;
};

export default SearchPage;
