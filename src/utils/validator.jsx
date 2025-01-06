import { isEmpty } from "./helpers";

const required = (value, name) => {
  return isEmpty(value) || value.includes(" ") ? `${name} is invalid.` : false;
};

const requiredAcceptSpace = (value, name) => {
  return isEmpty(value) ? `${name} is invalid.` : false;
};

const minLength = (min) => {
  return (value, name) => {
    return value.length < min
      ? `${name} must be at least ${min} characters long.`
      : false;
  };
};

const onlyDigitsAndLetters = (value, name) => {
  const regex = /^[a-zA-Z0-9]+$/;

  return !regex.test(value)
    ? `${name} can only contain letters and digits.`
    : false;
};

const requiredEmail = (value, name) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return !emailRegex.test(value) ? "Email is invalid." : false;
};

const requiredNumber = (value, name) => {
  const num = Number(value);

  return isNaN(num) || !isFinite(num)
    ? `${name} can only contain digits.`
    : false;
};

const confirmPassword = (valuePassword) => {
  return (value, name) => {
    return value !== valuePassword
      ? "The password confirmation does not match."
      : false;
  };
};

export {
  required,
  minLength,
  requiredEmail,
  requiredNumber,
  confirmPassword,
  requiredAcceptSpace,
  onlyDigitsAndLetters,
};
