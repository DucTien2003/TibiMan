import Tooltip from "@mui/material/Tooltip";
import clsx from "clsx";
import { useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { comicsIdApi, usersMyComicsApi } from "@/api";
import axiosRequest from "@/api/axiosRequest";
import AppIconButton from "@/components/common/buttons/AppIconButton";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import Cover from "@/components/common/Cover";
import ModalComponent from "@/components/common/ModalComponent";
import PaginationComponent from "@/components/specific/PaginationComponent";
import { useGetData } from "@/hooks";
import { comicUrl, detailComicUrl, uploadComicUrl } from "@/routes";
import { alertActions, useAlertStore } from "@/store";
import {
  FaAngleLeft,
  FaEye,
  FaRegComment,
  FaRegStar,
  FiBookmark,
  GrStatusGoodSmall,
  handleStatusComic,
  LuTrash2,
  MdOutlineRemoveRedEye,
  timeStandard,
} from "@/utils";

const NUMBER_OF_COMICS_PER_PAGE = 18;

function MyUpload() {
  // Hooks
  const navigate = useNavigate();
  const [, alertDispatch] = useAlertStore();
  const [params, setSearchParams] = useSearchParams();

  // States
  const deleteModalRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDeleteComic, setSelectedDeleteComic] = useState(null);

  // Variables
  const page = params.get("page") || 1;

  // Functions
  const handleBack = () => {
    navigate(-1);
  };

  const handleClickDelete = (comic) => {
    setSelectedDeleteComic(comic);
    deleteModalRef.current.openModal();
  };

  const handleDeleteComic = async (comicId) => {
    try {
      const response = await axiosRequest(comicsIdApi(comicId), {
        method: "DELETE",
      });

      if (response.success && response.code === 200) {
        alertDispatch(
          alertActions.showAlert("Delete comic successfully!", "success")
        );

        window.location.reload();
      } else {
        alertDispatch(alertActions.showAlert("Delete comic failed!", "error"));
      }
    } catch (error) {
      console.log("Error handleDeleteComic: ", error);
      alertDispatch(alertActions.showAlert("Delete comic failed!", "error"));
    }
  };

  const handlePageChange = (event, value) => {
    setSearchParams({
      page: value,
    });
    setCurrentPage(value);
  };

  const staticApis = useMemo(
    () => [
      {
        url: usersMyComicsApi(),
        query: {
          page,
          sortType: "DESC",
          orderBy: "created_at",
          limit: NUMBER_OF_COMICS_PER_PAGE,
        },
      },
    ],
    [page]
  );
  const { loading, error, responseData } = useGetData(staticApis);

  const [listComics] = responseData;

  if (loading || error) {
    return (
      <h2 className="mt-16 w-full text-center">
        {error ? `Error: ${error}` : "Loading..."}
      </h2>
    );
  }

  return (
    <div className="relative mb-10 mt-20">
      <div className="container">
        <div className="flex items-center">
          <AppIconButton color="black" onClick={handleBack}>
            <FaAngleLeft className="text-xl" />
          </AppIconButton>
          <h2 className="font-semibold">Your Uploaded Comics</h2>
        </div>

        <div className="my-4 flex justify-end">
          <Link to={uploadComicUrl()}>
            <DefaultButton
              hoverColor="primary.contrastText"
              className="!rounded-md">
              Upload a new comic
            </DefaultButton>
          </Link>
        </div>

        {/* List Comics */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {listComics.comics.map((comic) => (
            <div
              key={comic.id}
              className="flex gap-3 rounded border border-gray-200 p-2">
              <div className="w-24 md:w-32">
                <Cover comic={comic} />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-0.5 md:gap-1">
                {/* Name + Description */}
                <div className="flex flex-col gap-0.5 md:gap-1">
                  {/* Name */}
                  <div>
                    {/* Name */}
                    <div className="flex items-center justify-between gap-1">
                      <Link
                        to={comicUrl(comic.id)}
                        className="pr-2 font-medium">
                        <p className="limit-line-1 break-all text-base">
                          {comic.name}
                        </p>
                      </Link>
                      {/* Status */}
                      <Tooltip title={handleStatusComic(comic.status).text}>
                        <div>
                          <GrStatusGoodSmall
                            className={clsx(
                              handleStatusComic(comic.status).color,
                              "text-sm"
                            )}
                          />
                        </div>
                      </Tooltip>
                    </div>

                    {/* SubName */}
                    <p className="text-mini md:!text-xs">- {comic.subname} -</p>
                  </div>

                  {/* Description */}
                  <p className="limit-line-3 text-xs md:text-sm">
                    {comic.description}
                  </p>

                  {/* Info */}
                  <div className="flex items-center gap-2 text-xs">
                    <Tooltip title="Đánh giá">
                      <div className="flex items-center gap-1">
                        <FaRegStar />
                        <span>{comic.rating}</span>
                      </div>
                    </Tooltip>
                    <Tooltip title="Lượt xem">
                      <div className="flex items-center gap-1">
                        <MdOutlineRemoveRedEye />
                        <span>{comic.views}</span>
                      </div>
                    </Tooltip>
                    <Tooltip title="Bình luận">
                      <div className="flex items-center gap-1">
                        <FaRegComment />
                        <span>{comic.comments}</span>
                      </div>
                    </Tooltip>
                    <Tooltip title="Theo dõi">
                      <div className="flex items-center gap-1">
                        <FiBookmark />
                        <span>{comic.bookmarks}</span>
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {/* Info + Buttons */}
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs text-gray-600">
                    {timeStandard(comic.createdAt)}
                  </p>

                  <div className="flex items-center gap-2">
                    <DefaultButton
                      variant="outlined"
                      className="!min-w-0 gap-1"
                      onClick={() => handleClickDelete(comic)}>
                      <LuTrash2 className="text-sm" />
                      <span className="hidden text-xs md:block">Xóa</span>
                    </DefaultButton>
                    <Link to={detailComicUrl(comic.id)}>
                      <DefaultButton className="!min-w-0 gap-1">
                        <FaEye className="text-sm" />
                        <span className="hidden text-xs md:block">
                          Chi tiết
                        </span>
                      </DefaultButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {/* Pagination */}
        <div className="mt-6 flex w-full justify-center">
          <PaginationComponent
            size="large"
            currentPage={currentPage}
            itemPerPage={NUMBER_OF_COMICS_PER_PAGE}
            count={listComics.count}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      <ModalComponent
        title="Delete comic"
        submitTitle="Confirm"
        handleSubmit={() => handleDeleteComic(selectedDeleteComic.id)}
        ref={deleteModalRef}>
        {selectedDeleteComic && selectedDeleteComic.name && (
          <p>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedDeleteComic.name}</span>?
          </p>
        )}
        <p className="mt-1">Your data will be lost.</p>
      </ModalComponent>
    </div>
  );
}

export default MyUpload;
