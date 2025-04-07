import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import ChapterSelector from "@/components/specific/ChapterSelector";
import { chapterUrl } from "@/routes";
import { FaAngleLeft, FaAngleRight } from "@/utils";

function ChapterController({ listChapters, chapterInfo, comicId }) {
  const chapterIndex = listChapters.findIndex(
    (chapter) => chapter.id === chapterInfo.id
  );

  const isLastChapter = chapterInfo.id === listChapters[0].id;
  const isFirstChapter =
    chapterInfo.id === listChapters[listChapters.length - 1].id;

  const PrevWrapper = isFirstChapter ? "div" : Link;
  const NextWrapper = isLastChapter ? "div" : Link;

  const prevChapterUrl = isFirstChapter
    ? ""
    : chapterUrl(comicId, listChapters[chapterIndex + 1].id);
  const nextChapterUrl = isLastChapter
    ? ""
    : chapterUrl(comicId, listChapters[chapterIndex - 1].id);

  return (
    <div className="flex gap-1 md:gap-3">
      <PrevWrapper to={prevChapterUrl} className="md:min-w-48">
        <Button
          disabled={isFirstChapter}
          variant="outlined"
          className="flex h-full w-full items-center gap-1">
          <FaAngleLeft className="mb-0.5" />
          <span className="max-md:hidden">Chương trước</span>
        </Button>
      </PrevWrapper>

      <div className="flex-1">
        <ChapterSelector
          listChapters={listChapters}
          comicId={comicId}
          initialChapter={chapterInfo.numberOrder}
        />
      </div>

      <NextWrapper to={nextChapterUrl} className="md:min-w-48">
        <Button
          disabled={isLastChapter}
          variant="outlined"
          className="flex h-full w-full items-center gap-1">
          <span className="max-md:hidden">Chương sau</span>
          <FaAngleRight className="mb-0.5" />
        </Button>
      </NextWrapper>
    </div>
  );
}

export default ChapterController;
