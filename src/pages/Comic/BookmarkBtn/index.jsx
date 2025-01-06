import clsx from "clsx";
import { useState } from "react";

import axiosRequest from "@/api/axiosRequest";
import { comicsIdBookmarkApi } from "@/api";
import { FiBookmark } from "@/utils";

function BookMarkBtn({ comicInfo }) {
  const [isBookmark, setIsBookmark] = useState(comicInfo.authBookmark);

  const handleBookmark = async () => {
    // const comicBookmarkApiUrl = comicBookmarkApi(comicInfo.id);

    setIsBookmark(!isBookmark);
    if (isBookmark) {
      await axiosRequest(comicsIdBookmarkApi(comicInfo.id), {
        method: "DELETE",
      });
    } else {
      await axiosRequest(comicsIdBookmarkApi(comicInfo.id), { method: "POST" });
    }
  };

  return (
    <div
      className={clsx(
        {
          "theme-primary-bg text-white": isBookmark,
          "bg-gray-200 text-black hover:bg-gray-300": !isBookmark,
        },
        "flex cursor-pointer items-center justify-center rounded-md py-3"
      )}
      onClick={handleBookmark}>
      <FiBookmark className={"text-xl"} />
      <div className="ml-1 flex items-center justify-center gap-1 text-[15px] font-medium">
        <span>{isBookmark ? "Đang theo dõi" : "Theo dõi"}</span>
        <span>({comicInfo.bookmarks})</span>
      </div>
    </div>
  );
}

export default BookMarkBtn;
