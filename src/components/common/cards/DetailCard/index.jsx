import clsx from "clsx";
import { Link } from "react-router-dom";

import Cover from "@/components/common/Cover";
import { chapterUrl, comicUrl } from "@/routes";
import { useThemeStore } from "@/store";
import { FaEye, FaRegComment, FaRegStar, FiBookmark, timeAgo } from "@/utils";

import styles from "./detailCard.module.scss";

function DetailCard({ comic }) {
  const [themeState] = useThemeStore();

  return (
    <div className="w-full overflow-hidden rounded shadow-2xl">
      {/* Cover */}
      <Link
        to={comicUrl(comic.id)}
        className="relative overflow-hidden rounded">
        <Cover comic={comic} />

        {/* Cover info */}
        <div
          className={clsx(
            styles["card-overlay"],
            "absolute inset-0 flex flex-col justify-end"
          )}>
          <div
            className={clsx(styles["card-info"], "px-2 pb-2 pt-8 text-white")}>
            <div className="flex flex-col">
              <span
                className={clsx(
                  styles["card-name"],
                  "limit-line-2 text-sm font-semibold"
                )}
                title={comic.name}>
                {comic.name}
              </span>
              <span
                className={clsx(
                  styles["card-author"],
                  "limit-line-1 break-all text-xs text-gray-300"
                )}>
                {comic.author}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Chapter */}
      <div
        className={clsx(
          { "bg-theme-gray-900": themeState.theme === "dark" },
          "flex flex-col px-2 py-1"
        )}>
        <div className="flex items-center justify-between py-1">
          <div className="theme-primary-text flex items-center">
            <FaRegStar />
            <span className="ml-1 text-xs">{comic.rating}</span>
          </div>
          <div className="flex items-center">
            <FiBookmark />
            <span className="ml-1 text-xs">{comic.bookmarks}</span>
          </div>
          <div className="flex items-center">
            <FaRegComment />
            <span className="ml-1 text-xs">{comic.comments}</span>
          </div>
          <div className="flex items-center">
            <FaEye className="text-sm" />
            <span className="ml-1 text-xs">{comic.views}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-1">
          <Link
            to={chapterUrl(comic.id, comic.latestChapter.id)}
            className={clsx(
              "hover-theme-primary-text limit-line-1 inline-block flex-1 break-all text-xs font-medium"
            )}
            title={comic.latestChapter.name}>
            {comic.latestChapter.name}
          </Link>
          <span className="ml-2 text-xs">
            {timeAgo(comic.latestChapter.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
