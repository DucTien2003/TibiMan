import clsx from "clsx";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { chaptersIdViewsApi, comicsIdApi, comicsIdChaptersApi } from "@/api";
import axiosRequest from "@/api/axiosRequest";
import Comment from "@/components/specific/Comment";
import { useGetData, useWindowResize } from "@/hooks";
import { chapterUrl } from "@/routes";
import { useThemeStore } from "@/store";
import {
  breakLine,
  FaRegComment,
  MdOutlineRemoveRedEye,
  timeAgo,
} from "@/utils";

import ComicInfoOnMobile from "./ComicInfoOnMobile";
import ComicInfoOnPc from "./ComicInfoOnPc";
import Description from "./Description";
import Ranking from "./Ranking";

function Comic() {
  const { comicId } = useParams();
  const [themeState] = useThemeStore();
  const { isMobile } = useWindowResize();

  const handleUpdateChapterViews = async (chapterId) => {
    await axiosRequest(chaptersIdViewsApi(chapterId), { method: "PUT" });
  };

  // APIs
  const staticApis = useMemo(
    () => [
      { url: comicsIdApi(comicId) },
      { url: comicsIdChaptersApi(comicId) },
    ],
    [comicId]
  );

  const { loading, error, responseData } = useGetData(staticApis);
  const [comicInfo, listChapters] = responseData;

  const firstChapter = listChapters?.chapters[0];
  const lastChapter = listChapters?.chapters[listChapters.chapters.length - 1];

  if (loading || error) {
    return (
      <h2 className="mt-16 w-full text-center">{error || "Loading..."}</h2>
    );
  }

  return (
    <div className="mb-10">
      {/* Banner */}
      <div
        className={clsx("relative w-full bg-cover bg-no-repeat md:mb-[150px]")}>
        {/* Overlay */}
        <div
          style={{
            background: `
              linear-gradient(67.81deg, rgba(0, 0, 0, 0.64) 35.51%, transparent),
              url(${comicInfo.comic.cover})
            `,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            filter: "blur(2px)",
            backgroundPosition: "center 15%",
          }}
          className="absolute inset-0 h-[250px] md:h-[350px]"></div>

        {/* Comic info */}
        {isMobile ? (
          <ComicInfoOnMobile
            comicInfo={comicInfo.comic}
            lastChapter={lastChapter}
            firstChapter={firstChapter}
          />
        ) : (
          <ComicInfoOnPc
            comicInfo={comicInfo.comic}
            lastChapter={lastChapter}
            firstChapter={firstChapter}
          />
        )}
      </div>

      {/* Detail */}
      <div className="container flex flex-col">
        {/* Description */}
        <div className="my-10 flex flex-col">
          <h4 className="theme-border-border mb-3 border-b pb-1 font-medium">
            Nội dung
          </h4>
          <Description description={breakLine(comicInfo.comic.description)} />
        </div>

        {/* Chapter - Ranking */}
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-1">
            {/* Chapter */}
            <h4 className="mb-2 font-medium">Danh sách chương</h4>
            <div
              className={clsx(
                {
                  "border-theme-gray-700 border shadow-md":
                    themeState.theme === "light",
                },
                "bg-theme-gray-900 rounded-md py-3"
              )}>
              <div
                className={clsx(
                  `max-h-[450px] overflow-y-auto px-3 md:max-h-[715px]`
                )}>
                {listChapters.chapters.map((chapter, index) => {
                  return (
                    <div
                      className="bg-theme-gray-800 bg-theme-gray-600-hover transition-1/4 my-2 overflow-hidden rounded-md"
                      key={index}>
                      <Link
                        to={chapterUrl(comicId, chapter.id)}
                        onClick={() => {
                          handleUpdateChapterViews(chapter.id);
                        }}
                        className="flex cursor-pointer items-center justify-between gap-1 px-3 py-1">
                        <span className="text-sm md:text-base">
                          {chapter.name}
                        </span>

                        {/* Comment - View - Release date */}
                        <div className="flex flex-col items-center text-xs md:text-sm">
                          <div className="flex">
                            <div className="ml-3 flex items-center">
                              <FaRegComment className="mr-1" />
                              {chapter.comments}
                            </div>
                            <div className="ml-3 flex items-center">
                              <MdOutlineRemoveRedEye className="mr-1 text-base" />
                              {chapter.views}
                            </div>
                          </div>
                          <div className="mt-1 w-full text-end">
                            {timeAgo(chapter.createdAt)}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Ranking */}
          <div className="flex w-full flex-col md:w-[380px]">
            <h4 className="mb-2 font-medium">Bảng xếp hạng</h4>
            <div
              className={clsx(
                {
                  "border-theme-gray-700 border shadow-md":
                    themeState.theme === "light",
                },
                "bg-theme-gray-900 flex-1 rounded-md"
              )}>
              <div className="my-2 px-3">
                <Ranking />
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-6">
          <h4 className="mb-2 font-medium">Bình luận</h4>
          <div
            className={clsx(
              {
                "border-theme-gray-700 border": themeState.theme === "light",
              },
              "bg-theme-gray-900 rounded-md p-2"
            )}>
            <Comment comicId={comicInfo.comic.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comic;
