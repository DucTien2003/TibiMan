import clsx from "clsx";
import axiosRequest from "@/api/axiosRequest";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import AppInput from "@/components/common/AppInput";
import DefaultButton from "@/components/common/buttons/DefaultButton";

import { loginApi } from "@/api";
import { forgotPasswordUrl, registerUrl } from "@/routes";
import { required, minLength } from "@/utils";
import {
  useAlertStore,
  alertActions,
  useAuthStore,
  authActions,
} from "@/store";

function Login() {
  const navigate = useNavigate();

  // Provider
  const [, alertDispatch] = useAlertStore();
  const [, authDispatch] = useAuthStore();

  // For form
  const methods = useForm();
  const { setError } = methods;

  const onSubmit = async (data) => {
    const response = await axiosRequest(loginApi(), {
      method: "post",
      body: { username: data.username, password: data.password },
    });

    const responseData = response.data;

    if (response.code === 200 && response.success) {
      authDispatch(authActions.login(responseData));

      // Save tokens to local storage
      localStorage.setItem("accessToken", responseData.accessToken);
      localStorage.setItem("refreshToken", responseData.refreshToken);
      navigate("/");

      alertDispatch(alertActions.showAlert(response.message, "success"));
    } else {
      if (response.code === 500) {
        alertDispatch(alertActions.showAlert(response.message, "error"));
        return;
      }

      if (responseData.errors.length > 0) {
        responseData.errors.forEach((err) => {
          setError(err.field, {
            type: "manual",
            message: err.message,
          });
        });
      }
    }
  };

  return (
    <Fragment>
      <div className="px-8">
        <h4 className="mb-4 text-center font-semibold">
          Sign in to your account
        </h4>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {/* Username or email */}
            <div className="mt-1">
              <AppInput
                id="username"
                type="text"
                name="Username or Email"
                label="Username or email"
                placeholder="Enter your account"
                validator={[required, minLength(6)]}
              />
            </div>

            {/* Password */}
            <div className="mt-1">
              <AppInput
                id="password"
                type="password"
                name="Password"
                label="Password"
                placeholder="Enter your password"
                validator={[required]}
              />
            </div>

            {/* Remember me / Forgot password */}
            <div className="mt-1 flex justify-between">
              {/* Remember me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className={"cursor-pointer"}
                />
                <label
                  htmlFor="remember-me"
                  className="mt-1 cursor-pointer pl-2">
                  Remember me
                </label>
              </div>

              {/* Forgot password */}
              <span>
                <Link
                  to={forgotPasswordUrl()}
                  className="!theme-primary-text mt-1 hover:underline">
                  Forgot Password?
                </Link>
              </span>
            </div>

            {/* Submit */}
            <DefaultButton
              type="submit"
              className="!mt-4 w-full !rounded-lg font-semibold">
              Sign In
            </DefaultButton>
          </form>
        </FormProvider>
      </div>

      <div className={clsx("mt-6 bg-gray-800 py-4 text-center text-gray-300")}>
        <span>New user?</span>
        <Link
          to={registerUrl()}
          className="!theme-primary-text ml-2 inline-block cursor-pointer hover:underline">
          Register
        </Link>
      </div>
    </Fragment>
  );
}

export default Login;
