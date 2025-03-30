import Button from "@mui/material/Button";
import clsx from "clsx";
import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  chaptersIdApi,
  chaptersIdImagesApi,
  comicsIdApi,
  comicsIdChaptersApi,
} from "@/api";
import AppIconButton from "@/components/common/buttons/AppIconButton";
import ChapterSelector from "@/components/specific/ChapterSelector";
import Comment from "@/components/specific/Comment";
import { useGetData } from "@/hooks";
import { chapterUrl, comicUrl } from "@/routes";
import { useThemeStore } from "@/store";
import { FaAngleLeft, FaAngleRight } from "@/utils";

import GoToTopButton from "./GoToTopButton";

function Chapter() {
  const navigate = useNavigate();
  const [themeState] = useThemeStore();
  const { comicId, chapterId } = useParams();

  const staticApis = useMemo(
    () => [
      { url: comicsIdApi(comicId) },
      {
        url: comicsIdChaptersApi(comicId),
        query: { orderby: "number_order", sortType: "DESC" },
      },
    ],
    [comicId]
  );

  const dynamicApis = useMemo(
    () => [
      { url: chaptersIdApi(chapterId) },
      { url: chaptersIdImagesApi(chapterId) },
    ],
    [chapterId]
  );

  const staticResponse = useGetData(staticApis);
  const dynamicResponse = useGetData(dynamicApis);

  if (staticResponse.loading || dynamicResponse.loading) {
    return <h2 className="mt-16 w-full text-center">Loading...</h2>;
  }
  if (staticResponse.error || dynamicResponse.error) {
    return (
      <h2 className="mt-16 w-full text-center">
        {staticResponse.error || dynamicResponse.error}
      </h2>
    );
  }

  const [{ comic: comicInfo }, { chapters: listChapters }] =
    staticResponse.responseData;
  const [{ chapter: chapterInfo }, { images: listImages }] =
    dynamicResponse.responseData;

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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="position-relative container pb-20">
      {/* Header */}
      <div className="mt-20 pb-8">
        {/* Title */}
        <div className="flex items-center gap-1 text-xl">
          <AppIconButton color="black" onClick={handleBack}>
            <FaAngleLeft className="text-lg" />
          </AppIconButton>
          <Link
            to={comicUrl(comicInfo.id)}
            className="hover-theme-primary-text theme-primary-text">
            {comicInfo.name}
          </Link>
          <span className="mx-1">-</span>
          <span>{chapterInfo.name}</span>
        </div>

        {/* Control */}
        <div className="mt-6 flex">
          <PrevWrapper to={prevChapterUrl} className="min-w-48">
            <Button
              disabled={isFirstChapter}
              variant="outlined"
              className="flex h-full w-full items-center gap-1">
              <FaAngleLeft className="mb-0.5" />
              <span>Chương trước</span>
            </Button>
          </PrevWrapper>

          <div className="mx-3 flex-1">
            <ChapterSelector
              listChapters={listChapters}
              comicId={comicId}
              initialChapter={chapterInfo.numberOrder}
            />
          </div>

          <NextWrapper to={nextChapterUrl} className="min-w-48">
            <Button
              disabled={isLastChapter}
              variant="outlined"
              className="flex h-full w-full items-center gap-1">
              <span>Chương sau</span>
              <FaAngleRight className="mb-0.5" />
            </Button>
          </NextWrapper>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-[850px]">
        {listImages.map((image, index) => {
          return (
            <div key={index}>
              <img src={image.url} alt="img" className="w-full object-cover" />
            </div>
          );
        })}
      </div>

      {/* Controller bottom */}
      <div className="mt-6 flex">
        <PrevWrapper to={prevChapterUrl} className="min-w-48">
          <Button
            disabled={isFirstChapter}
            variant="outlined"
            className="flex h-full w-full items-center gap-1">
            <FaAngleLeft className="mb-0.5" />
            <span>Chương trước</span>
          </Button>
        </PrevWrapper>

        <div className="mx-3 flex-1">
          <ChapterSelector
            listChapters={listChapters}
            comicId={comicId}
            initialChapter={chapterInfo.numberOrder}
          />
        </div>

        <NextWrapper to={nextChapterUrl} className="min-w-48">
          <Button
            disabled={isLastChapter}
            variant="outlined"
            className="flex h-full w-full items-center gap-1">
            <span>Chương sau</span>
            <FaAngleRight className="mb-0.5" />
          </Button>
        </NextWrapper>
      </div>

      {/* Comments */}
      <div className="mt-12">
        <h4 className="mb-2 font-medium">Bình luận</h4>
        <div
          className={clsx(
            {
              "border-theme-gray-700 border": themeState.theme === "light",
            },
            "bg-theme-gray-900 rounded-md p-2"
          )}>
          <Comment comicId={comicInfo.id} />
        </div>
      </div>

      {/* Go to top button */}
      <GoToTopButton />
    </div>
  );
}

export default Chapter;
