import React from "react";
import Cookies from "js-cookie";

const useAuthentication = () => {
  const cookie = Cookies.get("token");
};

export { useAuthentication };
