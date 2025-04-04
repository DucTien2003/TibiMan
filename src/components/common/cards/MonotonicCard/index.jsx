import clsx from "clsx";
import { Link } from "react-router-dom";

import Cover from "@/components/common/Cover";
import { comicUrl } from "@/routes";
import { useThemeStore } from "@/store";

import styles from "./monotonicCard.module.scss";

function MonotonicCard({ comic }) {
  const [themeState] = useThemeStore();

  return (
    <Link
      className={clsx(
        styles["monotonic-card"],
        "w-full cursor-pointer overflow-hidden rounded shadow-xl"
      )}
      to={comicUrl(comic.id)}>
      {/* Cover */}
      <div className="theme-primary-border rounded border">
        <Cover comic={comic} />
      </div>

      {/* Chapter */}
      <div
        className={clsx(
          { "bg-theme-gray-900": themeState.theme === "dark" },
          "flex flex-col px-1 py-2"
        )}>
        <p
          className={clsx(
            styles["card-name"],
            "limit-line-1 break-all font-medium"
          )}>
          {comic.name}
        </p>
      </div>
    </Link>
  );
}

export default MonotonicCard;
