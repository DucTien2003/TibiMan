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
import Comment from "@/components/specific/Comment";
import { useGetData } from "@/hooks";
import { comicUrl } from "@/routes";
import { useThemeStore } from "@/store";
import { FaAngleLeft } from "@/utils";

import ChapterController from "./ChapterController";
import GoToTopButton from "./GoToTopButton";

function Chapter() {
  // Hooks
  const navigate = useNavigate();
  const [themeState] = useThemeStore();
  const { comicId, chapterId } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  const staticApis = useMemo(
    () => [
      { url: comicsIdApi(comicId) },
      {
        url: comicsIdChaptersApi(comicId),
        query: { orderby: "number_order", order: "DESC" },
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

  const { loading, error, responseData } = useGetData(staticApis);
  const comicInfo = responseData?.[0]?.comic;
  const listChapters = responseData?.[1]?.chapters;

  const {
    loading: dynamicLoading,
    error: dynamicError,
    responseData: dynamicResponseData,
  } = useGetData(dynamicApis);
  const chapterInfo = dynamicResponseData?.[0]?.chapter;
  const listImages = dynamicResponseData?.[1]?.images;

  if (loading || dynamicLoading || error || dynamicError) {
    return (
      <h2 className="mt-16 w-full text-center">
        {error || dynamicError || "Loading..."}
      </h2>
    );
  }

  return (
    <div className="position-relative pb-20">
      {/* Header */}
      <div className="container mt-16 pb-8">
        {/* Title */}
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <div className="flex items-center gap-1">
            <AppIconButton color="black" onClick={handleBack}>
              <FaAngleLeft className="text-lg" />
            </AppIconButton>
            <Link
              to={comicUrl(comicInfo.id)}
              className="hover-theme-primary-text theme-primary-text md:text-xl">
              {comicInfo.name}
            </Link>
          </div>
          <span className="mx-1 hidden md:block">-</span>
          <span className="text-xl">{chapterInfo.name}</span>
        </div>

        {/* Control */}
        <div className="mt-6">
          <ChapterController
            listChapters={listChapters}
            chapterInfo={chapterInfo}
            comicId={comicId}
          />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-[850px] max-w-full">
        {listImages.map((image, index) => {
          return (
            <div key={index}>
              <img src={image.url} alt="img" className="w-full object-cover" />
            </div>
          );
        })}
      </div>

      {/* Controller bottom */}
      <div className="container mt-6">
        <ChapterController
          listChapters={listChapters}
          chapterInfo={chapterInfo}
          comicId={comicId}
        />
      </div>

      {/* Comments */}
      <div className="container mt-12">
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
