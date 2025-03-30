import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";

import { comicsIdCommentsApi, commentApi } from "@/api";
import axiosRequest from "@/api/axiosRequest";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import PaginationComponent from "@/components/specific/PaginationComponent";
import { useGetData } from "@/hooks";

import CommentItem from "./CommentItem";

const NUMBER_OF_COMMENTS_PER_PAGE = 5;

function Comment({ comicId }) {
  const isLogin = !!localStorage.getItem("accessToken");

  const commentInputRef = useRef(null);

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [listComments, setListComments] = useState([]);

  const staticApis = useMemo(
    () => [
      {
        url: comicsIdCommentsApi(comicId),
        query: { limit: NUMBER_OF_COMMENTS_PER_PAGE, page: 1 },
      },
    ],
    [comicId]
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
    setTotalPage(newListComments.data.count);
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
      const [{ comments, count }] = staticResponse.responseData;

      setListComments(comments);
      setTotalPage(count);
    }
  }, [staticResponse.loading, staticResponse.responseData]);

  if (staticResponse.loading) {
    return;
  }

  return (
    <div className="max-h-full py-1 md:py-3">
      {listComments.length > 0 ? (
        <div>
          {listComments.map((comment) => {
            return (
              <div key={comment.id} className="mb-2 pb-4 md:px-2">
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
        <div className="bg-theme-gray-800 theme-gray-text mb-2 flex items-center justify-center rounded py-4 font-medium md:mx-2">
          Be the first one to comment?
        </div>
      )}

      {/* Comment pagination */}
      {totalPage > 0 ? (
        <div className="my-4 flex w-full justify-center">
          <PaginationComponent
            size="large"
            itemPerPage={NUMBER_OF_COMMENTS_PER_PAGE}
            count={totalPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : null}

      {/* Comment input */}
      {isLogin && (
        <div className="md:px-2">
          <textarea
            ref={commentInputRef}
            rows={3}
            type="text"
            placeholder="Write your comment..."
            className={clsx("bg-theme-gray-800 w-full rounded p-4 shadow")}
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
