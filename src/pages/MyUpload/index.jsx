import clsx from "clsx";
import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axiosRequest from "@/api/axiosRequest";
import Cover from "@/components/common/Cover";
import ModalComponent from "@/components/common/ModalComponent";
import AppIconButton from "@/components/common/buttons/AppIconButton";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import { useGetData } from "@/hooks";
import { uploadComicUrl, editComicUrl } from "@/routes";
import { useAlertStore, alertActions } from "@/store";
import { usersMyComicsApi, comicsIdApi } from "@/api";
import {
  timeStandard,
  FaRegStar,
  FiBookmark,
  FaAngleLeft,
  FaRegComment,
  MdOutlineRemoveRedEye,
} from "@/utils";

function MyUpload() {
  const navigate = useNavigate();
  const [selectedDeleteComic, setSelectedDeleteComic] = useState(null);

  const deleteModalRef = useRef();
  const [, alertDispatch] = useAlertStore();

  const staticApis = useMemo(
    () => [
      {
        url: usersMyComicsApi(),
        query: { orderBy: "created_at", sortType: "ASC" },
      },
    ],
    []
  );

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

  const [{ comics: listComics }] = staticResponse.responseData;

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
              className="!ml-2 h-12 !rounded-md !px-10">
              Upload a new comic
            </DefaultButton>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {listComics.map((comic) => (
            <div
              key={comic.id}
              className="flex rounded border border-gray-200 p-2">
              <div className="w-40">
                <Cover comic={comic} className="h-20 w-20 rounded-md" />
              </div>

              <div className="ml-5 flex flex-1 flex-col justify-between">
                <div className="">
                  <div className="">
                    {/* Name */}
                    <div className="flex items-center justify-between">
                      <Link
                        to={uploadComicUrl(comic.name, comic.id)}
                        className="pr-2 font-medium">
                        <h4 className="limit-line-1 break-all">{comic.name}</h4>
                      </Link>

                      {/* Status */}
                      <span
                        className={clsx(
                          {
                            "border-green-400": comic.status === "Completed",
                            "border-red-400": comic.status === "Dropped",
                            "border-yellow-400": comic.status === "Ongoing",
                          },
                          "ml-2 flex min-w-12 items-center justify-center rounded-md border px-3 py-2 font-medium"
                        )}>
                        <span
                          className={clsx(
                            {
                              "bg-green-400": comic.status === "Completed",
                              "bg-red-400": comic.status === "Dropped",
                              "bg-yellow-400": comic.status === "Ongoing",
                            },
                            "mr-1 h-2 w-2 rounded-full"
                          )}></span>
                        <span>{comic.status}</span>
                      </span>
                    </div>

                    {/* SubName */}
                    <p className="text-sm">- {comic.subname} -</p>
                  </div>

                  {/* Description */}
                  <p className="limit-line-5 mt-2 text-sm">
                    {comic.description}
                  </p>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-600">
                    <p>Publish at: {timeStandard(comic.createdAt)}</p>

                    {/* Info */}
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <FaRegStar className="text-base" />
                        <span className="ml-1 mt-1">{comic.rating}</span>
                      </div>
                      <div className="ml-3 flex items-center">
                        <MdOutlineRemoveRedEye className="text-base" />
                        <span className="ml-1 mt-1">{comic.views}</span>
                      </div>
                      <div className="ml-3 flex items-center">
                        <FaRegComment className="text-base" />
                        <span className="ml-1 mt-1">{comic.comments}</span>
                      </div>
                      <div className="ml-3 flex items-center">
                        <FiBookmark className="text-base" />
                        <span className="ml-1 mt-1">{comic.bookmarks}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center font-medium">
                    <DefaultButton
                      variant="outlined"
                      className="!mr-2"
                      onClick={() => handleClickDelete(comic)}>
                      Delete
                    </DefaultButton>
                    <Link to={editComicUrl(comic.id)}>
                      <DefaultButton>Detail</DefaultButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
