import { useState } from "react";

import ListChapter from "./ListChapter";
import UploadChapter from "./UploadChapter";
import DefaultButton from "@/components/common/buttons/DefaultButton";

function ChaptersInfo({ comicInfo = {} }) {
  const [isUploading, setIsUploading] = useState(false);
  const [chapterUploading, setChapterUploading] = useState({});

  const handleGetImagesChapter = (chapter) => {
    setIsUploading(true);
    setChapterUploading(chapter);
  };

  const handleBackOrUploadNewChapter = () => {
    setChapterUploading({});
    setIsUploading(!isUploading);
  };

  return (
    <div className="">
      <DefaultButton
        className="!mb-8 !rounded-md text-lg font-medium"
        onClick={handleBackOrUploadNewChapter}>
        {isUploading ? "Danh sách chương" : "Tạo chương mới"}
      </DefaultButton>

      {isUploading ? (
        <UploadChapter
          chapter={chapterUploading}
          comicInfo={comicInfo}
          handleBackOrUploadNewChapter={handleBackOrUploadNewChapter}
        />
      ) : (
        <ListChapter
          handleGetImagesChapter={handleGetImagesChapter}
          comicInfo={comicInfo}
        />
      )}
    </div>
  );
}

export default ChaptersInfo;
