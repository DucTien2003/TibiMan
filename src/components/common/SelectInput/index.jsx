import { useState, forwardRef, useImperativeHandle } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectInput(
  { id, list, label, size = 'normal', initialValue = { value: '', title: '' } },
  ref
) {
  const [value, setValue] = useState(initialValue.value);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useImperativeHandle(ref, () => ({
    getValue() {
      return value;
    },

    setValue(newValue) {
      setValue(newValue);
    },

    resetValue() {
      setValue(initialValue.value);
    },
  }));

  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        size={size}
        value={value}
        label={label}
        onChange={handleChange}>
        {list.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            <span className="px-4 py-2">{item.title}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default forwardRef(SelectInput);
