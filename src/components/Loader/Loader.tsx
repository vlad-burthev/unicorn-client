import type { FC } from "react";

//styles
import styles from "./Loader.module.scss";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => {
  return <div className={styles.loader}></div>;
};

export default Loader;
