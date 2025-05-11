import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";

import styles from "./input.module.scss";

function AppSelectInput({
  id,
  list,
  label,
  size = "normal",
  defaultValue = list[0].value,
}) {
  const { control } = useFormContext();

  return (
    <div className={clsx(styles["app-select"], "w-full")}>
      <Controller
        name={id}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
              id={id}
              size={size}
              labelId={`${id}-label`}
              label={label}
              value={field.value}
              onChange={field.onChange}
              className={clsx("w-full")}
              {...field}>
              {list.map((item, index) => (
                <MenuItem value={item.value} key={index}>
                  <span className="px-4 py-2">{item.title}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </div>
  );
}

export default AppSelectInput;
