import TextField from "@mui/material/TextField";
import { useState, forwardRef, useImperativeHandle } from "react";

function TextFieldInput(
  {
    id,
    name,
    label,
    rows = 1,
    type = "text",
    validate = [],
    size = "normal",
    initialData = "",
    required = false,
    multiline = false,
    variant = "outlined",
  },
  ref
) {
  const [value, setValue] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState("");

  useImperativeHandle(ref, () => ({
    checkError() {
      for (let i = 0; i < validate.length; i++) {
        const error = validate[i](value, name);
        if (error) {
          setErrorMessage(error);
          return true;
        } else {
          setErrorMessage("");
        }
      }

      setErrorMessage(false);
      return false;
    },

    getValue() {
      return value;
    },

    setValue(newValue) {
      setValue(newValue);
    },

    resetValue() {
      setValue(initialData);
    },

    setError(error) {
      setErrorMessage(error);
    },
  }));

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      id={id}
      size={size}
      value={value}
      type={type}
      label={required ? label + "*" : label}
      variant={variant}
      multiline={multiline}
      onChange={handleChange}
      helperText={errorMessage}
      rows={multiline ? rows : 1}
      error={errorMessage ? true : false}
      className="w-full"
    />
  );
}

export default forwardRef(TextFieldInput);
