import clsx from "clsx";
import { Link } from "react-router-dom";

import { homeUrl } from "@/routes";

import styles from "./authLayout.module.scss";

function AuthLayout({ children }) {
  return (
    <div
      className={clsx(
        styles["auth-bg"],
        "font-league-spartan flex min-h-screen items-center justify-center bg-black text-white"
      )}>
      <div
        className={clsx(
          styles["auth-container"],
          "w-[500px] max-w-full max-sm:mx-2"
        )}>
        <div className="my-4 flex justify-center">
          <Link
            to={homeUrl()}
            className={clsx(
              styles["logo"],
              "flex items-center justify-center hover:underline"
            )}>
            <img
              src="https://mangadex.org/favicon.svg"
              alt="logo"
              className="w-12"
            />
            <span className="ml-2 text-3xl font-semibold">MangaDex</span>
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
