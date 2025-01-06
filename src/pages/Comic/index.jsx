import clsx from "clsx";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import Rating from "./Rating";
import Ranking from "./Ranking";
import styles from "./comic.module.scss";
import BookMarkBtn from "./BookmarkBtn";
import Cover from "@/components/common/Cover";
import axiosRequest from "@/api/axiosRequest";
import Comment from "@/components/specific/Comment";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import { useGetData } from "@/hooks";
import { chapterUrl } from "@/routes";
import { useThemeStore } from "@/store";
import { breakLine, timeAgo } from "@/utils";
import {
  FaRegComment,
  FaPaintBrush,
  GrStatusGoodSmall,
  MdOutlineTranslate,
  MdOutlineRemoveRedEye,
} from "@/utils";
import { comicsIdApi, comicsIdChaptersApi, chaptersIdViewsApi } from "@/api";

function Comic() {
  const { comicName, comicId } = useParams();
  const [themeState] = useThemeStore();

  // const isLogin = !!localStorage.getItem("accessToken");

  const handleUpdateChapterViews = async (chapterId) => {
    await axiosRequest(chaptersIdViewsApi(chapterId), { method: "PUT" });
  };

  const handleStatusComic = (status) => {
    switch (status) {
      case "completed":
        return {
          text: "Hoàn thành",
          color: "theme-success-main",
        };
      case "dropped":
        return {
          text: "Đã ngừng",
          color: "theme-error-main",
        };
      case "ongoing":
        return {
          text: "Đang tiến hành",
          color: "theme-warning-main",
        };
      default:
        return "Đang cập nhật";
    }
  };

  // APIs
  const staticApis = useMemo(
    () => [
      { url: comicsIdApi(comicId) },
      { url: comicsIdChaptersApi(comicId) },
    ],
    [comicId]
  );

  const staticResponse = useGetData(staticApis);

  if (staticResponse.loading) {
    return <h2 className="mt-16 w-full text-center">Loading...</h2>;
  }

  if (staticResponse.error) {
    return (
      <h2 className="mt-16 w-full text-center">
        Error: {staticResponse.error}
      </h2>
    );
  }

  const [comicInfo, listChapters] = staticResponse.responseData;

  const firstChapter = listChapters.chapters[0];
  const lastChapter = listChapters.chapters[listChapters.chapters.length - 1];

  return (
    <div className="relative mb-10">
      {/* Banner */}
      <div className="absolute left-0 top-0 -z-20 h-[300px] w-full overflow-hidden">
        <img
          src={comicInfo.comic.cover}
          alt="cover"
          className={clsx(
            styles["banner-bg"],
            "w-full select-none object-cover"
          )}
        />
      </div>
      {/* Overlay */}
      <div
        className={clsx(
          styles["banner-overlay"],
          "absolute left-0 right-0 -z-10 h-[300px] w-full"
        )}></div>

      {/* Detail */}
      <div className="container flex flex-col pt-20">
        <div className="flex w-full">
          <div className="mr-5 w-[220px]">
            {/* Cover */}
            <div className="shadow-lg">
              <Cover comic={comicInfo.comic} />
            </div>

            {/* Bookmark */}
            <div className="mt-2">
              <BookMarkBtn comicInfo={comicInfo.comic} />
            </div>

            {/* Rating */}
            <div className="my-1">
              <Rating
                comicId={comicId}
                rating={comicInfo.comic.rating}
                authRating={comicInfo.comic.authRating}
              />
            </div>

            <div className="border-theme-gray-300 flex items-center gap-1 overflow-hidden rounded border border-solid py-1">
              {/* Views */}
              <Tooltip title="Lượt xem" placement="bottom" arrow>
                <div className="flex w-1/2 items-center justify-center py-1">
                  <MdOutlineRemoveRedEye className="text-xl" />
                  <span className="ml-1 text-sm">{comicInfo.comic.views}</span>
                </div>
              </Tooltip>

              <Divider
                orientation="vertical"
                flexItem
                className="border-theme-gray-500-imp"
              />

              {/* Comments */}
              <Tooltip title="Bình luận" placement="bottom" arrow>
                <div className="flex w-1/2 items-center justify-center py-1">
                  <FaRegComment className="text-lg" />
                  <span className="ml-1 text-sm">
                    {comicInfo.comic.comments}
                  </span>
                </div>
              </Tooltip>
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            {/* Name */}
            <div className="inline-flex flex-1 flex-col">
              {/* Name */}
              <h1 className="min-w-fit !text-5xl font-bold text-white">
                {comicInfo.comic.name}
              </h1>
              {/* Sub-name */}
              <span className="mt-3 text-xl text-white">
                {comicInfo.comic.subName}
              </span>
            </div>

            <div className="flex flex-col">
              {/* Info */}
              <div className="my-5 flex flex-col gap-1">
                {/* Author - Artist */}
                <div className="flex items-center">
                  <FaPaintBrush className="text-sm" />
                  <span className="ml-1 w-[100px]">Tác giả:</span>
                  <span className="font-medium">
                    {comicInfo.comic.author || "Đang cập nhật"}
                  </span>
                </div>

                {/* Translator */}
                <div className="flex items-center">
                  <MdOutlineTranslate className="text-sm" />
                  <span className="ml-1 w-[100px]">Dịch giả:</span>
                  <span className="font-medium">
                    {comicInfo.comic.translator || "Đang cập nhật"}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <GrStatusGoodSmall
                    className={clsx(
                      handleStatusComic(comicInfo.comic.status).color,
                      "text-sm"
                    )}
                  />
                  <span className="ml-1 w-[100px]">Tình trạng:</span>
                  <span className="font-medium">
                    {handleStatusComic(comicInfo.comic.status).text ||
                      "Đang cập nhật"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Read */}
                <Link
                  to={chapterUrl(
                    comicName,
                    comicId,
                    firstChapter.name,
                    firstChapter.id
                  )}>
                  <DefaultButton
                    hoverColor="primary.contrastText"
                    className="h-12 !rounded-md !px-10">
                    Start reading
                  </DefaultButton>
                </Link>
                <Link
                  to={chapterUrl(
                    comicName,
                    comicId,
                    lastChapter.name,
                    lastChapter.id
                  )}>
                  <DefaultButton
                    hoverColor="primary.contrastText"
                    className="h-12 !rounded-md !px-10">
                    Latest chapter
                  </DefaultButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-[220px] mt-8">
          {/* Genres */}
          <div className="mt-2 flex flex-wrap">
            {comicInfo.comic.genres.map((genre, index) => (
              <span
                key={index}
                className="theme-primary-border theme-primary-text mr-2 mt-2 cursor-pointer rounded-md border px-3 py-1">
                {genre.title}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="my-10 flex flex-col">
          <h4 className="theme-border-border mb-3 border-b pb-1 font-medium">
            Nội dung
          </h4>
          <p className="">{breakLine(comicInfo.comic.description)}</p>
        </div>

        {/* Chapter - Suggest */}
        <div className="flex gap-4">
          <div className="w-7/12">
            {/* Chapter */}
            <h4 className="mb-2 font-medium">Danh sách chương</h4>
            <div
              className={clsx(
                {
                  "border-theme-gray-700 border shadow-md":
                    themeState.theme === "light",
                },
                "bg-theme-gray-900 rounded-md"
              )}>
              <div className={clsx("my-2 max-h-[500px] overflow-y-auto px-3")}>
                {listChapters.chapters.map((chapter, index) => {
                  return (
                    <div
                      className="bg-theme-gray-800 bg-theme-gray-600-hover transition-1/4 my-2 overflow-hidden rounded-md"
                      key={index}>
                      <Link
                        to={chapterUrl(
                          comicName,
                          comicId,
                          chapter.name,
                          chapter.id
                        )}
                        onClick={() => {
                          handleUpdateChapterViews(chapter.id);
                        }}
                        className="flex cursor-pointer items-center justify-between px-3 py-1">
                        <span className="text-lg">{chapter.name}</span>

                        {/* Comment - View - Release date */}
                        <div className="flex flex-col items-center text-sm">
                          <div className="flex">
                            <span className="ml-3 flex items-center">
                              <FaRegComment className="mr-1" />
                              {chapter.comments}
                            </span>
                            <span className="ml-3 flex items-center">
                              <MdOutlineRemoveRedEye className="mr-1 text-base" />
                              {chapter.views}
                            </span>
                          </div>
                          <span className="mt-1 w-full text-end">
                            {timeAgo(chapter.createdAt)}
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Ranking */}
          <div className="flex w-5/12 flex-col">
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
                <Ranking></Ranking>
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-20">
          <h3 className={clsx(styles["header-box"], "text-2xl font-medium")}>
            Bình luận
          </h3>
          <Comment comicId={comicInfo.comic.id} />
        </div>
      </div>
    </div>
  );
}

export default Comic;
