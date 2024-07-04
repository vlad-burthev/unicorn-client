import React, { useState, type FC, useEffect } from "react";

//styles
import styles from "./AuthPage.module.scss";
//hooks
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/userApi";
import AuthForm from "../../components/AuthForm/AuthForm";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../hooks/storeHooks";
import { setLoginUser } from "../../store/userSlice/userSlice";
import { Helmet } from "react-helmet-async";

interface AuthPageProps {}

const AuthPage: FC<AuthPageProps> = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, password: e.target.value }));
  };
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, email: e.target.value.trim() }));
  };

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      setUserData({ email: "", password: "" });
      dispatch(setLoginUser());
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <>
      <Helmet>
        <title>Login - UServer</title>
      </Helmet>
      <div className={styles.auth}>
        {error && (
          <div className={styles["error-block"]}>
            {(error as any)?.data?.message?.error.map((error: any) => (
              <motion.div
                className={styles["error-message"]}
                key={error.msg}
                initial={{ opacity: 0, transform: "scale(0)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                exit={{ opacity: 0, transform: "scale(0)" }}
              >
                {error.msg}
              </motion.div>
            ))}
          </div>
        )}
        <div className={styles.form__container}>
          <AuthForm
            userData={userData}
            changeEmail={changeEmail}
            changePassword={changePassword}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            isError={isError}
            submitBtnTitle={"login"}
          />
          <div className={styles.redirect}>
            <span>Not registered yet? </span>
            <Link to={"/registration"}>Create an account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
