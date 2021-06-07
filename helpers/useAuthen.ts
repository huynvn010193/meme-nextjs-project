import { useEffect } from "react";
import { parseJwt } from ".";
import { useRouter } from "next/router";
import { useGlobalState } from "../state";

// bắt buộc đăng nhập mới vào dc.
const useAuthen = () => {
  const router = useRouter();
  const [token] = useGlobalState("token");
  useEffect(() => {
    const userToken = parseJwt(token);
    if(!(userToken && userToken.id && userToken.email)) {
      router.push('/login');
    }
  },[token])
};

const useNotAuthen = () => {
  const [token] = useGlobalState("token");
  const router = useRouter();
  useEffect(() => {
    const userToken = parseJwt(token);
    if(userToken && userToken.id && userToken.email) {
      router.push('/');
    }
  },[token])
};

export { useAuthen, useNotAuthen };
