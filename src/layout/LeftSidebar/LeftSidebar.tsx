import type { FC } from "react";
//styles
import styles from "./LeftSidebar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/storeHooks";
import clsx from "clsx";

interface LeftSidebarProps {}

const LeftSidebar: FC<LeftSidebarProps> = () => {
  const { email } = useAppSelector((state) => state.user);

  return (
    <aside className={styles.sidebar}>
      <div className={styles["container"]}>
        <div className={styles["logo"]}>
          <Link to={"/"}>UServer</Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles["nav-list"]}>
            <li className={styles["nav-list__item"]}>
              <NavLink
                className={({ isActive }) =>
                  clsx(styles["nav-list__item__link"], {
                    [styles["active-link"]]: isActive,
                  })
                }
                to={"/"}
              >
                Main
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  clsx(styles["nav-list__item__link"], {
                    [styles["active-link"]]: isActive,
                  })
                }
                to={"/electricity_providers"}
              >
                Providers
              </NavLink>
            </li>
          </ul>
        </nav>
        <div>{email}</div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
