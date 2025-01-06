import clsx from "clsx";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

import styles from "./input.module.scss";
import { IoIosEye, IoIosEyeOff } from "@/utils";

function AppInput({
  id,
  name,
  label,
  rows = 1,
  type = "text",
  validator = [],
  size = "normal",
  required = false,
  multiline = false,
  defaultValue = "",
  variant = "outlined",
  ...rest
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  if (id === "confirmPassword") {
    validator.push((value) => {
      const { password } = control._formValues;
      return value === password || "Passwords do not match";
    });
  }

  return (
    <div className="flex w-full flex-col">
      <span className="relative">
        <Controller
          id={id}
          name={id}
          control={control}
          defaultValue={defaultValue}
          rules={{
            required: required ? "Trường này là bắt buộc" : false,
            validate: (value) => {
              for (let i = 0; i < validator.length; i++) {
                const error = validator[i](value, name);
                if (error) {
                  return error;
                }
              }
              return true;
            },
          }}
          render={({ field }) => (
            <>
              {/* Input */}
              <TextField
                id={id}
                size={size}
                variant={variant}
                multiline={multiline}
                rows={multiline ? rows : 1}
                label={label + (required ? " *" : "")}
                type={showPassword ? "text" : type}
                className={clsx(
                  { [styles["error-input"]]: errors[id] },
                  styles["input"],
                  "w-full rounded-lg text-black"
                )}
                error={!!errors[id]}
                helperText={errors[id] && errors[id].message}
                {...rest}
                {...field}
                // name={name}
                // helperText={errors[id] && errors[id].message}
              />

              {/* Show/Hide password */}
              {type === "password" && (
                <span
                  className="theme-primary-text absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
                  onClick={togglePassword}>
                  {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </span>
              )}
            </>
          )}
        />
      </span>
    </div>
  );
}

export default AppInput;
