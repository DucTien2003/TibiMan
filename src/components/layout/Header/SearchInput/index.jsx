import clsx from "clsx";

import styles from "./searchInput.module.scss";
import { CiSearch } from "@/utils";

function Input() {
  return (
    <div className="relative w-full max-w-3xl">
      <form className={clsx(styles["search-form"])}>
        <input
          type="text"
          className={clsx(styles["search-input"])}
          placeholder="Search"
          id="search-input"
        />
        <label
          htmlFor="search-input"
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-text text-xl">
          <CiSearch />
        </label>
      </form>
    </div>
  );
}

export default Input;
