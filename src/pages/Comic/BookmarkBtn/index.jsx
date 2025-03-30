import { useState } from "react";

import axiosRequest from "@/api/axiosRequest";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import { FiBookmark } from "@/utils";
import { comicsIdBookmarkApi } from "@/api";

function BookMarkBtn({ comicInfo }) {
  const [isBookmark, setIsBookmark] = useState(comicInfo.authBookmark);

  const handleBookmark = async () => {
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
    <DefaultButton
      variant={isBookmark ? "contained" : "outlined"}
      className="flex h-12 w-full !min-w-24 gap-1 !rounded-md"
      onClick={handleBookmark}>
      <FiBookmark size={18} />
      <div className="flex items-center justify-center gap-1 text-[15px] font-medium">
        <span className="hidden md:block">
          {isBookmark ? "Đang theo dõi" : "Theo dõi"}
        </span>
        <span>({comicInfo.bookmarks})</span>
      </div>
    </DefaultButton>
  );
}

export default BookMarkBtn;
