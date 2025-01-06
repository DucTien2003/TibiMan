import { useMemo, useEffect } from "react";

import { isEmpty } from "@/utils";
import { usersMyApi } from "@/api";
import { useGetData } from "@/hooks";
import { useAuthStore, authActions } from "@/store";

const GetAuthData = () => {
  const [, authDispatch] = useAuthStore();
  const isLogin = localStorage.getItem("accessToken");

  const staticApis = useMemo(
    () => (isLogin ? [{ url: usersMyApi() }] : []),
    [isLogin]
  );

  const staticResponse = useGetData(staticApis);

  const [authInfo] =
    staticResponse.responseData && !isEmpty(staticResponse.responseData)
      ? staticResponse.responseData
      : [];

  useEffect(() => {
    if (isLogin && !isEmpty(authInfo)) {
      authDispatch(authActions.login(authInfo.user));
    }
  }, [isLogin, authInfo, authDispatch]);

  return null;
};

export default GetAuthData;
