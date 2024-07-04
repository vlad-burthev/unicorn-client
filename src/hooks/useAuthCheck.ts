// hooks/useAuthCheck.ts
import { useEffect } from "react";
import { useCheckAuthMutation } from "../api/userApi";
import { useAppDispatch } from "../hooks/storeHooks";
import { setEmail, setLoginUser } from "../store/userSlice/userSlice";

const useAuthCheck = () => {
  const [checkAuth, { data, isSuccess }] = useCheckAuthMutation();
  const dispatch = useAppDispatch();
  console.log(data);
  useEffect(() => {
    const check = async () => {
      await checkAuth("");
    };
    check();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setLoginUser());
      dispatch(setEmail(data));
    }
  }, [isSuccess]);

  return { data, isSuccess };
};

export default useAuthCheck;
