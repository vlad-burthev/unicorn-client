import { useEffect, type FC } from "react";

//styles
import styles from "./DeleteModal.module.scss";
import { useAppSelector, useAppDispatch } from "../../hooks/storeHooks";
import { useDeleteProviderMutation } from "../../api/electricityProvidersApi";
import { closeDeleteModal } from "../../store/modalSlice/modalSlice";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import ErrorAlert from "../ErrorAlert/ErrorAlert";

const DeleteModal: FC = () => {
  const dispatch = useAppDispatch();
  const { companyId, companyName } = useAppSelector(
    (state) => state.modals.deleteModal.deleteData
  );
  const [deleteProvider, { isSuccess, isLoading, error }] =
    useDeleteProviderMutation();

  const handleCloseModal = () => {
    dispatch(closeDeleteModal());
  };

  const handleDeleteProvider = async () => {
    await deleteProvider(companyId);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(closeDeleteModal());
    }
  }, [isSuccess, dispatch]);

  if (isLoading) {
    return (
      <div onClick={handleCloseModal} className={styles.modal}>
        <div className={styles.loader}>
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div onClick={handleCloseModal} className={styles.modal}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, transform: "translateY(0px)" }}
        animate={{ opacity: 1, transform: "translateY(200px)" }}
        exit={{ opacity: 0, transform: "translateY(0)" }}
        className={styles.content}
      >
        <h3 className={styles.title}>
          Are you sure you want to remove <span>{companyName}</span> provider?
        </h3>
        <div className={styles["btn-block"]}>
          <button
            className={styles["delete-btn"]}
            onClick={handleDeleteProvider}
          >
            Delete
          </button>
          <button className={styles["cancel-btn"]} onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </motion.div>

      {error && <ErrorAlert error={error} />}
    </div>
  );
};

export default DeleteModal;
