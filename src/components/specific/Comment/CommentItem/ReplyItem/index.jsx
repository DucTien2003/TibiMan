import clsx from "clsx";
import { Fragment, useState } from "react";

import {
  timeAgo,
  FaRegComment,
  AiOutlineLike,
  AiOutlineDislike,
} from "@/utils";

function ReplyItem({ reply, handleLike, handleDislike, handleShowReplyInput }) {
  const [replyInfo, setReplyInfo] = useState(reply);

  return (
    <Fragment>
      <div className="mr-2">
        <img
          src={
            reply.user?.avatar || require("@/assets/images/user-avatar-1.png")
          }
          alt="avatar"
          className="h-8 w-8 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className={clsx("flex flex-col")}>
          <div className="flex flex-col rounded-lg bg-slate-100 p-2">
            {/* Name user reply */}
            <div className="flex items-center">
              <span className="font-medium">
                {reply.user?.name || "Need fix"}
              </span>
            </div>

            {/* Content reply */}
            <p className="mt-1">{replyInfo.content}</p>
          </div>

          {/* Like - Dislike - Reply */}
          <div className="mt-1 flex items-center">
            <span
              className={clsx(
                { "theme-primary-text": replyInfo.authLiked },
                "flex cursor-pointer items-center"
              )}
              onClick={() => handleLike(replyInfo, setReplyInfo)}>
              <AiOutlineLike className="mr-1" />
              <span className="text-xs">{replyInfo.likes}</span>
            </span>
            <span
              className={clsx(
                { "theme-primary-text": replyInfo.authDisliked },
                "ml-3 flex cursor-pointer items-center"
              )}
              onClick={() => handleDislike(replyInfo, setReplyInfo)}>
              <AiOutlineDislike className="mr-1" />
              <span className="text-xs">{replyInfo.dislikes}</span>
            </span>
            <span
              className={clsx(
                "hover-theme-primary-text ml-3 flex cursor-pointer items-center"
              )}
              onClick={() => handleShowReplyInput(reply.rightValue)}>
              <FaRegComment className="mr-1" />
              <span className="text-xs">Reply</span>
            </span>
            <div className="ml-3 text-xs">{timeAgo(reply.createdAt)}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ReplyItem;
