import type { FC } from "react";

//styles
import styles from "./ErrorAlert.module.scss";
import { motion } from "framer-motion";

interface ErrorAlertProps {
  error: any;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ error }) => {
  return (
    <>
      <div className={styles["error-block"]}>
        {typeof (error as any)?.data?.message?.error === "string" ? (
          <motion.div
            className={styles["server-error"]}
            initial={{ opacity: 0, transform: "scale(0)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0, transform: "scale(0)" }}
          >
            {(error as any)?.data?.message?.error}
          </motion.div>
        ) : (
          (error as any)?.data?.message?.error.map((error: any) => (
            <motion.div
              className={styles["server-error"]}
              key={error.msg}
              initial={{ opacity: 0, transform: "scale(0)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(0)" }}
            >
              {error.msg}
            </motion.div>
          ))
        )}
      </div>
    </>
  );
};

export default ErrorAlert;
