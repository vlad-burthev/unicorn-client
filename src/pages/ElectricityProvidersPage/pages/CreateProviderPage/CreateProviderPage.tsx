import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./CreateProviderPage.module.scss";
import { useCreateProviderMutation } from "../../../../api/electricityProvidersApi";
import ProviderForm from "../../../../components/ProviderForm/ProviderForm";
import ErrorAlert from "../../../../components/ErrorAlert/ErrorAlert";

interface CreateProviderPageProps {}

const CreateProviderPage: FC<CreateProviderPageProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  }: any = useForm({ mode: "onChange" });

  const [createProvider, { isSuccess, isError, error, isLoading }] =
    useCreateProviderMutation();

  const onSubmitCreateForm = async (data: any) => {
    if (Object.keys(errors).length === 0 && !isError) {
      await createProvider(data);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <div className={styles["create-provider"]}>
      {error && <ErrorAlert error={error} />}

      <ProviderForm
        isError={isError}
        isLoading={isLoading}
        handleSubmit={handleSubmit(onSubmitCreateForm)}
        defaultValue={true}
        register={register}
        errors={errors}
        btnTitle={"Create"}
      />
    </div>
  );
};

export default CreateProviderPage;
