import { useState, type FC } from "react";

//styles
import styles from "./AuthForm.module.scss";
//icons
import CloseEyeIcon from "../../assets/icons/eye_close-icon.svg?react";
import OpenEyeIcon from "../../assets/icons/eye_open-icon.svg?react";
import MailIcon from "../../assets/icons/mail-icon.svg?react";
import PasswordIcon from "../../assets/icons/password-icon.svg?react";
//hooks
import clsx from "clsx";
import Loader from "../Loader/Loader";

interface AuthFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  changePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userData: {
    email: string;
    password: string;
  };
  isLoading: boolean;
  isError: boolean;
  submitBtnTitle: string;
}

const AuthForm: FC<AuthFormProps> = ({
  handleSubmit,
  changePassword,
  changeEmail,
  userData,
  isLoading,
  isError,
  submitBtnTitle,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form__input__block}>
        <label className={styles.label} htmlFor="email">
          Email Address
        </label>
        <MailIcon />
        <input
          id="email"
          className={clsx(
            styles.input,
            styles["input-email"],
            isError ? styles["input-error"] : ""
          )}
          type="text"
          value={userData.email}
          onChange={(e) => changeEmail(e)}
        />
      </div>

      <div className={styles.form__input__block}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <PasswordIcon />
        <input
          value={userData.password}
          id="password"
          className={clsx(
            styles.input,
            styles["input-password"],
            isError ? styles["input-error"] : ""
          )}
          type={showPassword ? "text" : "password"}
          onChange={(e) => changePassword(e)}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className={styles["show-password__btn"]}
        >
          {showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
        </button>
      </div>

      <button className={styles["submit__btn"]} type="submit">
        <span className={isLoading ? styles.hidden : ""}>{submitBtnTitle}</span>
        {isLoading && (
          <span className={styles.loader}>
            <Loader />
          </span>
        )}
      </button>
    </form>
  );
};

export default AuthForm;
