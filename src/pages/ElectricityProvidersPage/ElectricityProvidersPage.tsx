import type { FC } from "react";
import styles from "./ElectricityProvidersPage.module.scss";
import { NavLink, Outlet } from "react-router-dom";

interface ElectricityProvidersPageProps {}

const ElectricityProvidersPage: FC<ElectricityProvidersPageProps> = () => {
  return (
    <>
      <div className={styles["provider-page"]}>
        <div className={styles.header}>
          <nav className={styles.nav}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles["active-link"] : ""
              }
              to="/electricity_providers"
              end
            >
              All
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles["active-link"] : ""
              }
              to={"create"}
            >
              Creat new
            </NavLink>
          </nav>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default ElectricityProvidersPage;
