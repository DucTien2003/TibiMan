import clsx from 'clsx';
import { useState, forwardRef, useImperativeHandle } from 'react';

import styles from './input.module.scss';
import { IoIosEye, IoIosEyeOff } from '@/utils';

function Input(
  { label, type, placeholder, id, name, validator = [], require = true },
  ref
) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useImperativeHandle(ref, () => ({
    checkError() {
      for (let i = 0; i < validator.length; i++) {
        const error = validator[i](value, name);
        if (error) {
          setErrorMessage(error);
          return true;
        }
      }

      setErrorMessage(false);
      return false;
    },

    getValue() {
      return value;
    },

    setError(error) {
      setErrorMessage(error);
    },
  }));

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      <div>
        <label htmlFor={id}>
          <span>{label}</span>
          {require && <span className="ml-1 text-red-500">*</span>}
        </label>
      </div>
      <span className="relative">
        <input
          className={clsx(
            { [styles['error-input']]: errorMessage },
            styles['input'],
            'w-full rounded-lg text-black'
          )}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
        />
        <span
          className={clsx(
            { hidden: type !== 'password' },
            'theme-primary-text absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl'
          )}
          onClick={togglePassword}>
          {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
        </span>
      </span>
      <div
        className={clsx(
          { invisible: !errorMessage },
          styles['error-message'],
          'mt-1 min-h-6'
        )}>
        {errorMessage}
      </div>
    </div>
  );
}

export default forwardRef(Input);
