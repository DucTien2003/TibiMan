import Tooltip from "@mui/material/Tooltip";
import clsx from "clsx";
import { useRef } from "react";
import { Link } from "react-router-dom";

import { comicsIdApi } from "@/api";
import axiosRequest from "@/api/axiosRequest";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import Cover from "@/components/common/Cover";
import ModalComponent from "@/components/common/ModalComponent";
import { comicUrl, detailComicUrl } from "@/routes";
import { alertActions, useAlertStore } from "@/store";
import {
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

function InfoCard({ comic, isUser = false }) {
  // Hooks
  const [, alertDispatch] = useAlertStore();

  // Variables

  // States
  const deleteModalRef = useRef();

  // Functions
  const handleClickDelete = () => {
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

  return (
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
              <Link to={comicUrl(comic.id)} className="pr-2 font-medium">
                <p className="limit-line-1 break-all text-base">{comic.name}</p>
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
          <p className="limit-line-3 text-xs md:text-sm">{comic.description}</p>
        </div>

        {/* Info + Buttons */}
        <div className="flex flex-col gap-1">
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

          <div className="flex items-center justify-between gap-1">
            <p className="text-xs text-gray-600">
              {timeStandard(comic.createdAt)}
            </p>

            {isUser ? (
              <div>
                <p className="text-xs text-gray-600">{comic.author}</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <DefaultButton
                  variant="outlined"
                  className="!min-w-0 gap-1"
                  onClick={handleClickDelete}>
                  <LuTrash2 className="text-sm" />
                  <span className="hidden text-xs md:block">Xóa</span>
                </DefaultButton>
                <Link to={detailComicUrl(comic.id)}>
                  <DefaultButton className="!min-w-0 gap-1">
                    <FaEye className="text-sm" />
                    <span className="hidden text-xs md:block">Chi tiết</span>
                  </DefaultButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <ModalComponent
        title="Delete comic"
        submitTitle="Confirm"
        handleSubmit={() => handleDeleteComic(comic.id)}
        ref={deleteModalRef}>
        {comic && comic.name && (
          <p>
            Xác nhận xóa{" "}
            <span className="font-semibold">&quot;{comic.name}&quot;</span>?
          </p>
        )}
        <p className="mt-1">Dữ liệu của bạn sẽ bị mất.</p>
      </ModalComponent>
    </div>
  );
}

export default InfoCard;
