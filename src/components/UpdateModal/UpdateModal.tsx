import { useEffect, type FC } from "react";
import { motion } from "framer-motion";

//api
import {
  useGetOneProviderQuery,
  useUpdateProviderMutation,
} from "../../api/electricityProvidersApi";
//styles
import styles from "./UpdateModal.module.scss";
//hooks
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { closeUpdateModal } from "../../store/modalSlice/modalSlice";
import Loader from "../Loader/Loader";
import { useForm } from "react-hook-form";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import ProviderForm from "../ProviderForm/ProviderForm";

interface UpdateModalProps {}

const UpdateModal: FC<UpdateModalProps> = () => {
  const dispatch = useAppDispatch();
  const { companyId } = useAppSelector((state) => state.modals.updateModal);
  const { data, isSuccess, isLoading } = useGetOneProviderQuery(companyId);
  const [
    updateProvider,
    {
      isError,
      isLoading: updateProviderLoading,
      isSuccess: updateProviderIsSuccess,
      error,
    },
  ] = useUpdateProviderMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const handleCloseModal = () => {
    dispatch(closeUpdateModal());
  };
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (updateProviderIsSuccess) {
      dispatch(closeUpdateModal());
      reset();
    }
  }, [updateProviderIsSuccess, dispatch, reset]);

  const onSubmitUpdateForm = async (data: any) => {
    if (Object.keys(errors).length === 0 && !isError) {
      await updateProvider({ providerData: data, companyId });
      dispatch(closeUpdateModal());
      reset();
    }
  };

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
        onClick={handleContentClick}
        initial={{ opacity: 0, transform: "translateY(0px)" }}
        animate={{ opacity: 1, transform: "translateY(200px)" }}
        exit={{ opacity: 0, transform: "translateY(0)" }}
        className={styles.content}
      >
        {isSuccess ? (
          data && (
            <ProviderForm
              isError={isError}
              isLoading={updateProviderLoading}
              handleSubmit={handleSubmit(onSubmitUpdateForm)}
              defaultValue={true}
              register={register}
              errors={errors}
              data={data}
              btnTitle={"Update"}
            />
          )
        ) : (
          <h2 className={styles["error-title"]}>Company not found</h2>
        )}
      </motion.div>
      {error && <ErrorAlert error={error} />}
    </div>
  );
};

export default UpdateModal;
