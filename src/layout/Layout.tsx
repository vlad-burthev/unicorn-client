import type { FC } from "react";
import { Outlet } from "react-router-dom";

//styles
import styles from "./Layout.module.scss";
//components
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import { useAppSelector } from "../hooks/storeHooks";
import UpdateModal from "../components/UpdateModal/UpdateModal";
import DeleteModal from "../components/DeleteModal/DeleteModal";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  const { updateModalIsOpen } = useAppSelector(
    (state) => state.modals.updateModal
  );
  const { deleteModalIsOpen } = useAppSelector(
    (state) => state.modals.deleteModal
  );

  return (
    <div className={styles.wrapper}>
      <LeftSidebar />
      {updateModalIsOpen && <UpdateModal />}
      {deleteModalIsOpen && <DeleteModal />}

      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
