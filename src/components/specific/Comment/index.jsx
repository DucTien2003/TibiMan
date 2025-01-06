import clsx from "clsx";
import { useState, useEffect, useRef, useMemo } from "react";

import CommentItem from "./CommentItem";
import styles from "./comment.module.scss";
import axiosRequest from "@/api/axiosRequest";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import PaginationComponent from "@/components/specific/PaginationComponent";
import { useGetData } from "@/hooks";
import { comicsIdCommentsApi, commentApi } from "@/api";

const NUMBER_OF_COMMENTS_PER_PAGE = 5;

function Comment({ comicId }) {
  const isLogin = !!localStorage.getItem("accessToken");

  const commentInputRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [listComments, setListComments] = useState([]);

  const staticApis = useMemo(
    () => [
      {
        url: comicsIdCommentsApi(comicId),
        query: { limit: NUMBER_OF_COMMENTS_PER_PAGE, page: currentPage },
      },
    ],
    [comicId, currentPage]
  );

  const staticResponse = useGetData(staticApis);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);

    handleGetListComments(value);
  };

  const handleGetListComments = async (page = currentPage) => {
    const newListComments = await axiosRequest(comicsIdCommentsApi(comicId), {
      query: { limit: NUMBER_OF_COMMENTS_PER_PAGE, page },
    });

    setListComments(newListComments.data.comments);
  };

  const handleComment = async () => {
    const commentContent = commentInputRef.current.value;
    if (commentContent.trim() === "") {
      return;
    }

    const respond = await axiosRequest(commentApi(), {
      method: "post",
      body: { comicId: comicId, content: commentContent },
    });

    if (respond.success) {
      await handleGetListComments();
    }

    commentInputRef.current.value = "";
  };

  useEffect(() => {
    if (!staticResponse.loading) {
      const [{ comments }] = staticResponse.responseData;

      setListComments(comments);
    }
  }, [staticResponse.loading, staticResponse.responseData]);

  if (staticResponse.loading) {
    return;
  }

  return (
    <div className="max-h-full py-3">
      {listComments.length > 0 ? (
        <div>
          {listComments.map((comment, index) => {
            return (
              <div
                key={comment.id}
                className={clsx(styles["item-box"], "mb-2 px-3 pb-4")}>
                <CommentItem
                  comment={comment}
                  comicId={comicId}
                  isLogin={isLogin}
                  handleGetListComments={handleGetListComments}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="theme-white-10-bg theme-gray-text mb-2 flex items-center justify-center rounded py-4 font-medium">
          Be the first one to comment?
        </div>
      )}

      {/* Comment pagination */}
      {listComments.length > 0 ? (
        <div className="my-4 flex w-full justify-center">
          <PaginationComponent
            size="large"
            itemPerPage={NUMBER_OF_COMMENTS_PER_PAGE}
            list={listComments}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : null}

      {/* Comment input */}
      {isLogin && (
        <div className={clsx("px-2")}>
          <textarea
            ref={commentInputRef}
            rows={3}
            type="text"
            placeholder="Write your comment..."
            className={clsx("w-full rounded-lg bg-slate-100 p-4")}
          />
          <div className="w-full text-end">
            <DefaultButton
              variant="contained"
              className="!px-8"
              onClick={handleComment}>
              Send
            </DefaultButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
