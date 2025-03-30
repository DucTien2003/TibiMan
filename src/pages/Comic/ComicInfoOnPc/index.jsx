import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import clsx from "clsx";
import { Link } from "react-router-dom";

import DefaultButton from "@/components/common/buttons/DefaultButton";
import Cover from "@/components/common/Cover";
import { chapterUrl } from "@/routes";
import {
  FaPaintBrush,
  FaRegComment,
  GrStatusGoodSmall,
  handleStatusComic,
  MdOutlineRemoveRedEye,
  MdOutlineTranslate,
} from "@/utils";

import BookMarkBtn from "../BookmarkBtn";
import Rating from "../Rating";

export default function ComicInfoOnPc({
  comicInfo,
  lastChapter,
  firstChapter,
}) {
  return (
    <div className="container relative flex w-full translate-y-1/4">
      <div className="mr-5 min-w-[112px] max-w-[220px]">
        {/* Cover */}
        <div className="shadow-lg">
          <Cover comic={comicInfo} />
        </div>

        {/* Bookmark */}
        <div className="mt-2">
          <BookMarkBtn comicInfo={comicInfo} />
        </div>

        {/* Rating */}
        <div className="my-1">
          <Rating
            comicId={comicInfo.id}
            rating={comicInfo.rating}
            authRating={comicInfo.authRating}
          />
        </div>

        <div className="border-theme-gray-300 flex items-center gap-1 overflow-hidden rounded border border-solid py-1">
          {/* Views */}
          <Tooltip title="Lượt xem" placement="bottom" arrow>
            <div className="flex w-1/2 items-center justify-center py-1">
              <MdOutlineRemoveRedEye className="text-xl" />
              <span className="ml-1 text-sm">{comicInfo.views}</span>
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
              <span className="ml-1 text-sm">{comicInfo.comments}</span>
            </div>
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {/* Name */}
        <div className="inline-flex flex-1 flex-col">
          {/* Name */}
          <h1 className="limit-line-3-md min-w-fit font-bold text-white md:!text-5xl">
            {comicInfo.name}
          </h1>
          {/* Sub-name */}
          <span className="mt-3 text-xl text-white">{comicInfo.subName}</span>
        </div>

        <div className="flex flex-col">
          {/* Info */}
          <div className="my-5 flex flex-col gap-1">
            {/* Author - Artist */}
            <div className="flex items-center">
              <FaPaintBrush className="text-sm" />
              <span className="ml-1 w-[100px]">Tác giả:</span>
              <span className="font-medium">
                {comicInfo.author || "Đang cập nhật"}
              </span>
            </div>

            {/* Translator */}
            <div className="flex items-center">
              <MdOutlineTranslate className="text-sm" />
              <span className="ml-1 w-[100px]">Dịch giả:</span>
              <span className="font-medium">
                {comicInfo.translator || "Đang cập nhật"}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <GrStatusGoodSmall
                className={clsx(
                  handleStatusComic(comicInfo.status).color,
                  "text-sm"
                )}
              />
              <span className="ml-1 w-[100px]">Tình trạng:</span>
              <span className="font-medium">
                {handleStatusComic(comicInfo.status).text || "Đang cập nhật"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Read */}
            <Link to={chapterUrl(comicInfo.id, firstChapter.id)}>
              <DefaultButton
                hoverColor="primary.contrastText"
                className="h-12 !rounded-md !px-10">
                Chương đầu tiên
              </DefaultButton>
            </Link>
            <Link to={chapterUrl(comicInfo.id, lastChapter.id)}>
              <DefaultButton
                hoverColor="primary.contrastText"
                className="h-12 !rounded-md !px-10">
                Chương mới nhất
              </DefaultButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Genres */}
      {/* <div className="ml-[220px] mt-8">
        <div className="mt-2 flex flex-wrap">
          {comicInfo.genres.map((genre, index) => (
            <span
              key={index}
              className="theme-primary-border theme-primary-text mr-2 mt-2 cursor-pointer rounded-md border px-3 py-1">
              {genre.title}
            </span>
          ))}
        </div>
      </div> */}
    </div>
  );
}
