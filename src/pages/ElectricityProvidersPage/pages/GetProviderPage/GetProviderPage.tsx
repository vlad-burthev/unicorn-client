import type { FC } from "react";
import clsx from "clsx";

//api
import { useGetAllProviderQuery } from "../../../../api/electricityProvidersApi";
//styles
import styles from "./GetProviderPage.module.scss";
//icons
import DeleteIcon from "../../../../assets/icons/trash-con.svg?react";
import UpdateIcon from "../../../../assets/icons/update-icon.svg?react";
//interfaces
import { T_Provider } from "../../../../interfaces";
import { useAppDispatch } from "../../../../hooks/storeHooks";
import {
  openDeleteModal,
  openUpdateModal,
} from "../../../../store/modalSlice/modalSlice";

interface GetProviderPageProps {}

const GetProviderPage: FC<GetProviderPageProps> = () => {
  const { data, isSuccess } = useGetAllProviderQuery("");
  const dispatch = useAppDispatch();
  const handleOpenUpdateModal = (companyId: string) => {
    dispatch(openUpdateModal(companyId));
  };

  const handleOpenDeleteProviderModal = (
    companyId: string,
    companyName: string
  ) => {
    dispatch(openDeleteModal({ companyId, companyName }));
  };

  if (data?.length === 0) {
    // Corrected typo here
    return (
      <h2 className={styles["empty-title"]}>
        Apparently someone forgot to fill out the table
      </h2>
    );
  }

  return (
    <div className={styles["page"]}>
      {isSuccess ? (
        <table
          className={styles.table}
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Market Share</th>
              <th>Renewable Energy %</th>
              <th>Yearly Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data.map((provider: T_Provider, index: number) => (
              <tr
                className={clsx(
                  styles.row,
                  index % 2 === 0 ? styles["odd-row"] : ""
                )}
                key={provider.name}
              >
                <td>{provider.name}</td>
                <td>{provider.country}</td>
                <td>{provider.marketShare} %</td>
                <td>{provider.renewableEnergyPercentage} %</td>
                <td>{provider.yearlyRevenue} $</td>
                <td>
                  <button
                    className={clsx(styles["table-btn"], styles["update-btn"])}
                    onClick={() => handleOpenUpdateModal(provider._id)}
                  >
                    <UpdateIcon />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleOpenDeleteProviderModal(provider._id, provider.name)
                    }
                    className={clsx(styles["table-btn"], styles["delete-btn"])}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className={styles["error-title"]}>
          oops.. we have a problem with the server
        </h2>
      )}
    </div>
  );
};

export default GetProviderPage;
