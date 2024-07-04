import type { FC } from "react";

//styles
import styles from "./ErrorAlert.module.scss";
import { motion } from "framer-motion";

interface ErrorAlertProps {
  error: any;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ error }) => {
  console.log(typeof error?.data.message === "string");
  return (
    <div className={styles["error-block"]}>
      {error?.data?.message && (
        <>
          {typeof error.data.message === "string" ? (
            <motion.div
              className={styles["server-error"]}
              initial={{ opacity: 0, transform: "scale(0)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(0)" }}
            >
              {error.data.message}
            </motion.div>
          ) : typeof error.data.message.error === "string" ? (
            <motion.div
              className={styles["server-error"]}
              initial={{ opacity: 0, transform: "scale(0)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(0)" }}
            >
              {error.data.message.error}
            </motion.div>
          ) : (
            error.data.message.error.map((errorItem: any, index: number) => (
              <motion.div
                className={styles["server-error"]}
                key={index}
                initial={{ opacity: 0, transform: "scale(0)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                exit={{ opacity: 0, transform: "scale(0)" }}
              >
                {errorItem.msg}
              </motion.div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default ErrorAlert;
