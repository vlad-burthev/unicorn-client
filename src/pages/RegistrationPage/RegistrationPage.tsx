import { useEffect, type FC, useState } from "react";

//styles
import styles from "./RegistrationPage.module.scss";
import { useRegistrationMutation } from "../../api/userApi";
import { useAppDispatch } from "../../hooks/storeHooks";
import { Link, useNavigate } from "react-router-dom";
import { setLoginUser } from "../../store/userSlice/userSlice";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Helmet } from "react-helmet-async";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";

interface RegistrationPageProps {}

const RegistrationPage: FC<RegistrationPageProps> = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, password: e.target.value }));
  };
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, email: e.target.value.trim() }));
  };

  const [registration, { isLoading, isSuccess, isError, error }] =
    useRegistrationMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registration(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      setUserData({ email: "", password: "" });
      navigate("/");
      dispatch(setLoginUser());
    }
  }, [isSuccess]);
  return (
    <>
      <Helmet>
        <title>Registration - UServer</title>
      </Helmet>
      <div className={styles.auth}>
        {error && <ErrorAlert error={error} />}
        <div className={styles.form__container}>
          <AuthForm
            userData={userData}
            changeEmail={changeEmail}
            changePassword={changePassword}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            isError={isError}
            submitBtnTitle={"registration"}
          />
          <div className={styles.redirect}>
            <span>Already have an account? </span>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
