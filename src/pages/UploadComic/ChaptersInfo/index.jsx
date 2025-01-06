import { useState } from "react";

import ListChapter from "./ListChapter";
import UploadChapter from "./UploadChapter";
import DefaultButton from "@/components/common/buttons/DefaultButton";

function ChaptersInfo({ listChapters, comicInfo = {} }) {
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
    <div className="px-8">
      <DefaultButton
        className="!mb-8 h-12 !rounded-md !px-10 text-lg font-medium"
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
          comicInfo={comicInfo}
          listChapters={listChapters}
          handleGetImagesChapter={handleGetImagesChapter}
        />
      )}
    </div>
  );
}

export default ChaptersInfo;
