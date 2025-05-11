import clsx from "clsx";
import { Link } from "react-router-dom";

import DefaultButton from "@/components/common/buttons/DefaultButton";
import Cover from "@/components/common/Cover";
import { chapterUrl } from "@/routes";
import {
  FaPaintBrush,
  FaRegComment,
  FaRegStar,
  FiBookmark,
  GrStatusGoodSmall,
  handleStatusComic,
  MdOutlineRemoveRedEye,
  MdOutlineTranslate,
} from "@/utils";

import BookMarkBtn from "../BookmarkBtn";
import Rating from "../Rating";

export default function ComicInfoOnMobile({
  comicInfo,
  lastChapter,
  firstChapter,
}) {
  return (
    <div className="container relative pt-[80px]">
      <div className="flex flex-col items-center justify-center">
        {/* Cover */}
        <div className="mb-2 max-w-[200px] shadow-lg">
          <Cover comic={comicInfo} />
        </div>

        {/* Name */}
        <div className="text-center">
          <h1 className="font-bold">{comicInfo.name}</h1>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <BookMarkBtn comicInfo={comicInfo} />
          <Rating
            comicId={comicInfo.id}
            rating={comicInfo.rating}
            authRating={comicInfo.authRating}
          />
        </div>
        {/* Sub-name */}
        {/* <div className="mt-3 text-xl">{comicInfo.subName}</div> */}
      </div>

      <div className="flex flex-col">
        {/* Info */}
        <div className="my-5 flex flex-col gap-1">
          <div className="flex items-center gap-5">
            {/* Views */}
            <div className="flex items-center gap-1">
              <MdOutlineRemoveRedEye className="text-xl" />
              <span>{comicInfo.views}</span>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-1">
              <FaRegComment className="text-lg" />
              <span>{comicInfo.comments}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <FaRegStar className="text-lg" />
              <span>{comicInfo.rating}</span>
            </div>

            {/* Bookmark */}
            <div className="flex items-center gap-1">
              <FiBookmark className="text-lg" />
              <span>{comicInfo.bookmarks}</span>
            </div>
          </div>

          {/* Author - Artist */}
          <div className="flex">
            <div>
              <div className="flex items-center">
                <FaPaintBrush className="text-sm" />
                <p className="ml-1 min-w-[80px]">Tác giả:</p>
              </div>
            </div>
            <p className="font-medium">{comicInfo.author || "Đang cập nhật"}</p>
          </div>

          {/* Translator */}
          <div className="flex items-center">
            <MdOutlineTranslate className="text-sm" />
            <p className="ml-1 w-[80px]">Dịch giả:</p>
            <p className="font-medium">
              {comicInfo.translator || "Đang cập nhật"}
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center">
            <GrStatusGoodSmall
              className={clsx(
                handleStatusComic(comicInfo.status).color,
                "text-sm"
              )}
            />
            <p className="ml-1 w-[80px]">Tình trạng:</p>
            <p className="font-medium">
              {handleStatusComic(comicInfo.status).text || "Đang cập nhật"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Read */}
          <Link to={chapterUrl(comicInfo.id, firstChapter.id)}>
            <DefaultButton
              hoverColor="primary.contrastText"
              className="!rounded-md !p-2 !text-[13px]">
              Chương đầu tiên
            </DefaultButton>
          </Link>
          <Link to={chapterUrl(comicInfo.id, lastChapter.id)}>
            <DefaultButton
              hoverColor="primary.contrastText"
              className="!rounded-md !p-2 !text-[13px]">
              Chương mới nhất
            </DefaultButton>
          </Link>
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
