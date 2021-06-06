import { useEffect } from "react";
import Cookies from "js-cookie";
import { parseJwt } from ".";
import { useRouter } from "next/router";

const useAuthentication = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  useEffect(() => {
    const userToken = parseJwt(token);
    if(!(userToken && userToken.id && userToken.email)) {
      router.push('/');
    }
  },[token])
};

const useNotAuthenticated = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  useEffect(() => {
    const userToken = parseJwt(token);
    if(userToken && userToken.id && userToken.email) {
      router.push('/');
    }
  },[token])
};

export { useAuthentication, useNotAuthenticated };
