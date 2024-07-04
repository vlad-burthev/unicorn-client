import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import ProviderChart from "../../components/ProviderChart/ProviderChart";
import { useGetAllProviderQuery } from "../../api/electricityProvidersApi";

//styles
import styles from "./HomePage.module.scss";

const HomePage: FC = () => {
  const { data, isSuccess } = useGetAllProviderQuery("");

  return (
    <>
      <Helmet>
        <title>Home - UServer</title>
      </Helmet>
      <div className={styles.home}>
        {isSuccess && <ProviderChart data={data} />}
      </div>
    </>
  );
};

export default HomePage;
