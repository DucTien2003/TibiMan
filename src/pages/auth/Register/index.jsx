import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import axiosRequest from "@/api/axiosRequest";
import AppInput from "@/components/common/AppInput";
import DefaultButton from "@/components/common/buttons/DefaultButton";

import { loginUrl } from "@/routes";
import { registerApi } from "@/api";
import { useAlertStore, alertActions } from "@/store";
import {
  required,
  minLength,
  requiredEmail,
  onlyDigitsAndLetters,
} from "@/utils";

function Register() {
  // Provider
  const navigate = useNavigate();
  const [, alertDispatch] = useAlertStore();

  // For form
  const methods = useForm();
  const { setError } = methods;

  const onSubmit = async (data) => {
    const response = await axiosRequest(registerApi(), {
      method: "post",
      body: {
        username: data.username,
        password: data.password,
        email: data.email,
      },
    });

    if (response.code === 200 && response.success) {
      navigate("/login");

      alertDispatch(alertActions.showAlert(response.message, "success"));
    } else {
      if (response.code === 500) {
        alertDispatch(alertActions.showAlert(response.message, "error"));
        return;
      }

      const errorData = response.data;
      if (errorData.errors.length > 0) {
        errorData.errors.forEach((err) => {
          setError(err.field, {
            type: "manual",
            message: err.message,
          });
        });
      }
    }

    // await axiosCustom()
    //   .post(registerApi(), {
    //     username: data.username,
    //     password: data.password,
    //     email: data.email,
    //   })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       navigate("/login");

    //       alertDispatch(
    //         alertActions.showAlert(response.data.message, "success")
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response.status === 500) {
    //       alertDispatch(
    //         alertActions.showAlert(error.response.data.message, "error")
    //       );
    //       return;
    //     }

    //     const errorData = error.response.data.data;
    //     if (errorData.errors.length > 0) {
    //       errorData.errors.forEach((err) => {
    //         setError(err.field, {
    //           type: "manual",
    //           message: err.message,
    //         });
    //       });
    //     }
    //   });
  };

  return (
    <div className="px-8">
      <h4 className="mb-4 text-center font-semibold">Create your account</h4>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mt-1">
            <AppInput
              label="Username"
              type="text"
              placeholder="Enter username"
              id="username"
              name="Username"
              validator={[required, minLength(6), onlyDigitsAndLetters]}
            />
          </div>

          <div className="mt-1">
            <AppInput
              label="Password"
              type="password"
              placeholder="Enter password"
              id="password"
              name="Password"
              validator={[required, minLength(6)]}
            />
          </div>

          <div className="mt-1">
            <AppInput
              label="Confirm password"
              type="password"
              placeholder="Enter confirm password"
              id="confirmPassword"
              name="Confirm password"
              validator={[required]}
            />
          </div>

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
            className="w-full !rounded-lg font-semibold">
            Register
          </DefaultButton>

          <div className="my-4 text-center">
            <span>Already have an account?</span>
            <Link
              to={loginUrl()}
              className="!theme-primary-text ml-2 inline-block hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Register;
