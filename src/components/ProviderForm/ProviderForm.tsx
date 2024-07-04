import type { BaseSyntheticEvent, FC } from "react";
import { useForm } from "react-hook-form";

//styles
import styles from "./ProviderForm.module.scss";
import { T_Provider } from "../../interfaces";
import clsx from "clsx";
import Loader from "../Loader/Loader";

interface ProviderFormProps {
  handleSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: ReturnType<typeof useForm>["register"];
  errors: Record<string, any>;
  defaultValue: boolean;
  data?: T_Provider;
  btnTitle: string;
  isLoading: boolean;
  isError: boolean;
  changeName?: boolean;
  changeCountry?: boolean;
  className?: string;
}

const ProviderForm: FC<ProviderFormProps> = ({
  handleSubmit,
  defaultValue,
  register,
  errors,
  data,
  btnTitle,
  isError,
  isLoading,
  changeName = true,
  changeCountry = true,
  className,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={clsx(styles["form__content"], className)}>
        {changeName && (
          <div className={styles["input-block"]}>
            <label htmlFor="name">Provider name</label>
            <input
              id="name"
              {...register("name", {
                required: "Required",
                maxLength: {
                  value: 50,
                  message: "Less than 50 characters",
                },
              })}
              type="text"
              className={clsx(
                styles.input,
                errors?.name || isError ? styles["input-error"] : ""
              )}
              defaultValue={defaultValue ? data?.name : ""}
            />
            {errors.name && (
              <span className={styles["error-message"]}>
                {errors?.name?.message}
              </span>
            )}
          </div>
        )}
        {changeCountry && (
          <div className={styles["input-block"]}>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              {...register("country", {
                required: "Required",
                maxLength: {
                  value: 50,
                  message: "Less than 50 characters",
                },
              })}
              className={clsx(
                styles.input,
                errors?.country || isError ? styles["input-error"] : ""
              )}
              defaultValue={defaultValue ? data?.country : ""}
              type="text"
            />
            {errors.country && (
              <span className={styles["error-message"]}>
                {errors.country.message}
              </span>
            )}
          </div>
        )}
        <div className={styles["input-block"]}>
          <label htmlFor="makeShare">Make Share</label>
          <input
            id="makeShare"
            {...register("marketShare", {
              required: "Required",
              setValueAs: (value: string) => parseFloat(value),
              validate: {
                positiveNumber: (value: string) =>
                  !isNaN(parseFloat(value)) || "Please enter a valid number",
                withinRange: (value: string) =>
                  (parseFloat(value) >= 0 && parseFloat(value) <= 100) ||
                  "Between 0 and 100",
              },
            })}
            className={clsx(
              styles.input,
              errors?.marketShare || isError ? styles["input-error"] : ""
            )}
            defaultValue={defaultValue ? data?.marketShare : ""}
            type="number"
          />
          {errors.marketShare && (
            <span className={styles["error-message"]}>
              {errors.marketShare.message}
            </span>
          )}
        </div>
        <div className={styles["input-block"]}>
          <label htmlFor="renewableEnergyPercentage">Renewable Energy %</label>
          <input
            id="renewableEnergyPercentage"
            {...register("renewableEnergyPercentage", {
              required: "Required",
              setValueAs: (value: string) => parseFloat(value),
              validate: {
                positiveNumber: (value: string) =>
                  !isNaN(parseFloat(value)) || "Invalid number",
                withinRange: (value: string) =>
                  (parseFloat(value) >= 0 && parseFloat(value) <= 100) ||
                  "Between 0 and 100",
              },
            })}
            className={clsx(
              styles.input,
              errors.renewableEnergyPercentage || isError
                ? styles["input-error"]
                : ""
            )}
            type="number"
            defaultValue={defaultValue ? data?.renewableEnergyPercentage : ""}
          />
          {errors.renewableEnergyPercentage && (
            <span className={styles["error-message"]}>
              {errors.renewableEnergyPercentage.message}
            </span>
          )}
        </div>
        <div className={styles["input-block"]}>
          <label htmlFor="yearlyRevenue">Yearly Revenue</label>
          <input
            id="yearlyRevenue"
            {...register("yearlyRevenue", {
              required: "Required",
              setValueAs: (value: string) => parseFloat(value),
              validate: {
                positiveNumber: (value: string) =>
                  !isNaN(parseFloat(value)) || "Invalid number",
              },
            })}
            className={clsx(
              styles.input,
              errors?.yearlyRevenue || isError ? styles["input-error"] : ""
            )}
            defaultValue={defaultValue ? data?.yearlyRevenue : ""}
            type="number"
          />
          {errors.yearlyRevenue && (
            <span className={styles["error-message"]}>
              {errors.yearlyRevenue.message}
            </span>
          )}
        </div>
      </div>
      <button
        disabled={isLoading || Object.keys(errors).length === 0 ? false : true}
        className={clsx(
          styles["submit-btn"],
          Object.keys(errors).length === 0 ? "" : styles.disabled
        )}
        type="submit"
      >
        <span className={isLoading ? styles.load : ""}>{btnTitle}</span>
        {isLoading && (
          <span className={styles.loader}>
            <Loader />
          </span>
        )}
      </button>
    </form>
  );
};

export default ProviderForm;
