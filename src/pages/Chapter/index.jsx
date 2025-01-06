import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import ChapterSelector from "@/components/specific/ChapterSelector";
import { chapterUrl, comicUrl } from "@/routes";
import { formatPath } from "@/utils";
import { useGetData } from "@/hooks";
import {
  comicsIdApi,
  chaptersIdApi,
  comicsIdChaptersApi,
  chaptersIdImagesApi,
} from "@/api";

function Chapter() {
  const { comicId, chapterId, comicName } = useParams();

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

  const prevChapterUrl = isFirstChapter
    ? "/"
    : chapterUrl(
        comicName,
        comicId,
        listChapters[chapterIndex + 1].name,
        listChapters[chapterIndex + 1].id
      );
  const nextChapterUrl = isLastChapter
    ? "/"
    : chapterUrl(
        comicName,
        comicId,
        listChapters[chapterIndex - 1].name,
        listChapters[chapterIndex - 1].id
      );

  return (
    <div>
      {/* Header */}
      <div className="container mt-20 pb-8">
        {/* Title */}
        <div className="flex items-center text-xl">
          <Link
            to={comicUrl(comicInfo.name, comicInfo.id)}
            className="hover-theme-primary-text theme-primary-text">
            {comicInfo.name}
          </Link>
          <span className="mx-1">-</span>
          <span>{chapterInfo.name}</span>
        </div>

        {/* Control */}
        <div className="mt-6 flex">
          {isFirstChapter ? (
            <div className="theme-border-border flex cursor-default items-center justify-center rounded px-10 font-medium">
              Previous chapter
            </div>
          ) : (
            <Link
              to={prevChapterUrl}
              className="theme-primary-border hover-theme-primary-text flex items-center justify-center rounded border px-10 font-medium">
              Previous chapter
            </Link>
          )}
          <div className="mx-3 flex-1">
            <ChapterSelector
              listChapters={listChapters}
              comicId={comicId}
              initialChapter={chapterInfo.numberOrder}
            />
          </div>
          {isLastChapter ? (
            <div className="theme-border-border flex cursor-default items-center justify-center rounded px-10 font-medium">
              Next chapter
            </div>
          ) : (
            <Link
              to={nextChapterUrl}
              className="theme-primary-border hover-theme-primary-text flex items-center justify-center rounded border px-10 font-medium">
              Next chapter
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-[1000px]">
        {listImages.map((image, index) => {
          return (
            <div key={index}>
              <img src={image.url} alt="img" className="w-full object-cover" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chapter;
