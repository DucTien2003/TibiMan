import clsx from "clsx";
import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";

import styles from "./input.module.scss";
import { IoIosEye, IoIosEyeOff } from "@/utils";

function AppInput({
  id,
  name,
  type,
  label,
  placeholder,
  validator = [],
  required = true,
  defaultValue = "",
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
    <div className="flex flex-col">
      <div>
        <label htmlFor={id}>
          <span>{label}</span>
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      </div>
      <span className="relative">
        <Controller
          name={id}
          control={control}
          defaultValue={defaultValue}
          rules={{
            required: required ? "This field is required" : false,
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
              <input
                className={clsx(
                  { [styles["error-input"]]: errors[id] },
                  styles["input"],
                  "w-full rounded-lg text-black"
                )}
                type={showPassword ? "text" : type}
                placeholder={placeholder}
                id={id}
                {...field}
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

      {/* Error message */}
      <div
        className={clsx(
          { invisible: !errors[id] },
          styles["error-message"],
          "mt-1 min-h-6"
        )}>
        {errors[id] && <span>{errors[id].message}</span>}
      </div>
    </div>
  );
}

export default AppInput;
