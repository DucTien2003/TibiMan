import axios from "axios";
import { Fragment } from "react";
import { format } from "date-fns";

const extend = Object.assign;

// Add zero
const addZero = (number) => {
  return number < 10 ? "0" + number : number;
};

const isEmpty = (value) => {
  return (
    value === null || // check for null
    value === undefined || // check for undefined
    value === "" || // check for empty string
    (Array.isArray(value) && value.length === 0) || // check for empty array
    (typeof value === "object" && Object.keys(value).length === 0) // check for empty object
  );
};

const timeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};

const timeStandard = (timestamp) => {
  return format(new Date(timestamp), "dd/MM/yyyy");
};

const showQuantity = (number) => {
  return number >= 1000 ? (number / 1000).toFixed(1) + "k" : number;
};

// Reformat path
const formatPath = (path) => {
  return path
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
};

// Remove slash at the end of string
const removeEndSlash = (str) => {
  return str.replace(/\/+$/, "");
};

// Sort by last number of string
const sortByLastNumber = (arr, ascending = false) => {
  return arr.sort((a, b) => {
    // Split the string by spaces and get the last element
    const numA = parseFloat(a.split(" ").pop());
    const numB = parseFloat(b.split(" ").pop());

    return ascending ? numB - numA : numA - numB;
  });
};

const convertImageToFile = async (imageUrl) => {
  const response = await axios.get(imageUrl, { responseType: "blob" });
  const blob = response.data;

  const urlParts = imageUrl.split("/");
  const filename = urlParts[urlParts.length - 1];

  const mimeType = blob.type;

  const file = new File([blob], filename, { type: mimeType });
  return file;
};

const reverseArray = (arr) => {
  return arr.slice().reverse();
};

const breakLine = (str) => {
  return str.split("\n").map((item, index) => (
    <Fragment key={index}>
      {item}
      <br />
    </Fragment>
  ));
};

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const capitalizeWords = (string) => {
  if (!string) return "";
  return string
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};

const hexToRgb = (hex) => {
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) return hex; // Trả về giá trị gốc nếu không phải HEX
  let c = hex.substring(1).split("");
  if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
  const r = parseInt(c[0] + c[1], 16);
  const g = parseInt(c[2] + c[3], 16);
  const b = parseInt(c[4] + c[5], 16);
  return `${r}, ${g}, ${b}`;
};

export {
  extend,
  addZero,
  isEmpty,
  timeAgo,
  hexToRgb,
  breakLine,
  formatPath,
  reverseArray,
  timeStandard,
  showQuantity,
  removeEndSlash,
  capitalizeWords,
  sortByLastNumber,
  convertImageToFile,
  capitalizeFirstLetter,
};
