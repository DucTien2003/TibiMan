import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

import ReplyItem from "./ReplyItem";
import axiosRequest from "@/api/axiosRequest";
import userAvatar1 from "@/assets/images/user-avatar-1.png";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import { useAuthStore } from "@/store";
import {
  commentIdCommentRepliesApi,
  commentReplyApi,
  commentIdLikeDislikeApi,
} from "@/api";
import {
  timeAgo,
  FaRegComment,
  AiOutlineLike,
  AiOutlineDislike,
} from "@/utils";

function CommentItem({ comment, comicId, isLogin, handleGetListComments }) {
  const replyInputRef = useRef(null);
  const [authState] = useAuthStore();

  const [commentInfo, setCommentInfo] = useState(comment);

  // Reply
  const [isReply, setIsReply] = useState(false);
  const [isShowReplied, setIsShowReplied] = useState(false);
  const [rightValueComment, setRightValueComment] = useState(
    comment.rightValue
  );

  const handleLike = async (selectedComment, setData) => {
    if (isLogin) {
      if (selectedComment.authLiked) {
        await axiosRequest(commentIdLikeDislikeApi(selectedComment.id), {
          method: "delete",
        });
      } else {
        await axiosRequest(commentIdLikeDislikeApi(selectedComment.id), {
          method: "post",
          body: { likeDislike: "like" },
        });
      }

      // Update comment info
      const response = await axiosRequest(
        commentIdCommentRepliesApi(selectedComment.id),
        { method: "get", query: { comicId: comicId } }
      );

      if (response.success) {
        setData(response.data.comment);
      }
    }
  };

  const handleDislike = async (selectedComment, setData) => {
    if (isLogin) {
      if (selectedComment.authDisliked) {
        await axiosRequest(commentIdLikeDislikeApi(selectedComment.id), {
          method: "delete",
        });
      } else {
        await axiosRequest(commentIdLikeDislikeApi(selectedComment.id), {
          method: "post",
          body: { likeDislike: "dislike" },
        });
      }

      // Update comment info
      const response = await axiosRequest(
        commentIdCommentRepliesApi(selectedComment.id),
        { method: "get", query: { comicId: comicId } }
      );

      if (response.success) {
        setData(response.data.comment);
      }
    }
  };

  const handleShowReplyInput = (rightValue) => {
    setRightValueComment(rightValue);
    setIsReply(!isReply);
  };

  const handleReplyComment = async () => {
    const commentContent = replyInputRef.current.value;

    if (commentContent.trim() === "") {
      return;
    }

    const respond = await axiosRequest(commentReplyApi(), {
      method: "post",
      body: {
        content: commentContent,
        comicId: comicId,
        parentRightValue: rightValueComment,
      },
    });

    if (respond.success) {
      await handleGetListComments();
    }

    replyInputRef.current.value = "";
    setIsReply(false);
    setIsShowReplied(true);
  };

  useEffect(() => {
    if (isReply && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [isReply]);

  useEffect(() => {
    setCommentInfo(comment);
  }, [comment]);

  return (
    <div className="flex">
      {/* Avatar */}
      <div>
        <img
          src={commentInfo.user?.avatar || userAvatar1}
          alt="avatar"
          className="mr-2 h-11 w-11 rounded-full"
        />
      </div>

      <div className="flex-1">
        <div className="flex flex-col">
          <div className="bg-theme-gray-800 flex flex-col rounded-lg p-2 shadow">
            {/* Name user comment */}
            <div className="flex items-center">
              <span className="font-medium">
                {commentInfo.user?.name || "Need fix"}
              </span>
              {!!commentInfo.chapter && (
                <span className="ml-3 text-xs text-gray-600">
                  {commentInfo.chapter.name}
                </span>
              )}
            </div>

            {/* Content comment */}
            <p className="mt-1">{commentInfo.content}</p>
          </div>

          {/* Like - Dislike - Reply */}
          <div className="mt-1 flex items-center gap-0.5 md:gap-1">
            <div
              className={clsx(
                { "theme-primary-text": commentInfo.authLiked },
                "flex cursor-pointer items-center gap-1"
              )}
              onClick={() => handleLike(commentInfo, setCommentInfo)}>
              <AiOutlineLike className="" />
              <span className="text-xs">{commentInfo.likes}</span>
            </div>
            <div
              className={clsx(
                { "theme-primary-text": commentInfo.authDisliked },
                "ml-3 flex cursor-pointer items-center gap-1"
              )}
              onClick={() => handleDislike(commentInfo, setCommentInfo)}>
              <AiOutlineDislike className="" />
              <span className="text-xs">{commentInfo.dislikes}</span>
            </div>
            <div
              className={clsx(
                "hover-theme-primary-text ml-3 flex cursor-pointer items-center gap-1"
              )}
              onClick={() => handleShowReplyInput(commentInfo.rightValue)}>
              <FaRegComment className="" />
              <span className="text-xs">Reply</span>
            </div>
            <div className="ml-3 text-xs">{timeAgo(commentInfo.createdAt)}</div>
          </div>
        </div>

        {/* Replied comment */}
        {!!commentInfo.replies && commentInfo.replies.length > 0 && (
          <div>
            {isShowReplied ? (
              commentInfo.replies.map((reply) => (
                <div className="mt-4 flex" key={reply.id}>
                  <ReplyItem
                    reply={reply}
                    handleShowReplyInput={handleShowReplyInput}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                  />
                </div>
              ))
            ) : (
              <p
                className="hover-theme-primary-text mt-3 inline-block cursor-pointer text-sm hover:underline"
                onClick={() => setIsShowReplied(true)}>
                {`View all ${commentInfo.replies.length} replies`}
              </p>
            )}
          </div>
        )}

        {/* Reply input */}
        {isLogin && isReply && (
          <div className="mt-4">
            <div className="flex">
              <div className="mr-2">
                <img
                  src={authState?.avatar || userAvatar1}
                  alt="avatar"
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <textarea
                ref={replyInputRef}
                rows={2}
                type="text"
                placeholder="Write your reply..."
                className={clsx(
                  "bg-theme-gray-800 flex-1 rounded-lg p-2 shadow"
                )}
              />
            </div>
            <div className="mt-2 w-full text-end">
              <DefaultButton variant="contained" onClick={handleReplyComment}>
                Send
              </DefaultButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
