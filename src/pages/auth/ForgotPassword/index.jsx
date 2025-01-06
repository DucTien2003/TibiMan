import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import axiosCustom from "@/api/axiosRequest";
import AppInput from "@/components/common/AppInput";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import { loginUrl } from "@/routes";
import { forgotPasswordApi } from "@/api";
import { useAlertStore, alertActions } from "@/store";
import { FaAnglesLeft, required, requiredEmail } from "@/utils";

function ForgotPassword() {
  const navigate = useNavigate();
  const [, alertDispatch] = useAlertStore();

  // For form
  const methods = useForm();
  const { setError } = methods;

  const onSubmit = async (data) => {
    await axiosCustom()
      .post(forgotPasswordApi(), {
        email: data.email,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/reset-password");
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          alertDispatch(
            alertActions.showAlert(error.response.data.message, "error")
          );
          return;
        }

        const errorData = error.response.data.data;
        if (errorData.errors.length > 0) {
          errorData.errors.forEach((err) => {
            setError(err.field, {
              type: "manual",
              message: err.message,
            });
          });
        }
      });
  };

  return (
    <Fragment>
      <div className="px-8">
        <h4 className="mb-4 text-center font-semibold">
          Forgot your password?
        </h4>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="mt-1">
              <AppInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                id="email"
                name="Email"
                validator={[required, requiredEmail]}
              />
            </div>

            <DefaultButton
              type="submit"
              className="w-full !rounded-lg font-semibold"
              hoverColor="primary.contrastText">
              Submit
            </DefaultButton>
          </form>
        </FormProvider>
      </div>

      <div className="flex justify-center py-4">
        <Link
          to={loginUrl()}
          className="!theme-primary-text flex items-center justify-center hover:underline">
          <FaAnglesLeft />
          <span className="ml-1 mt-1">Back to Login</span>
        </Link>
      </div>
    </Fragment>
  );
}

export default ForgotPassword;
