// Auth
export const loginApi = () => `/auth/login`;
export const registerApi = () => `/auth/register`;
export const resetPasswordApi = () => `/auth/reset-password`;
export const forgotPasswordApi = () => `/auth/forgot-password`;
export const resetAccessTokenApi = () => `/auth/reset-access-token`;

// User
export const usersMyApi = () => `/users/my`;
export const usersMyComicsApi = () => "/users/my/comics";
export const usersIdApi = (userId) => `/users/${userId}`;
export const usersIdComicsApi = (userId) => `/users/${userId}/comics`;

// Comic
export const comicsApi = () => `/comics`;
export const comicsIdApi = (comicId) => `/comics/${comicId}`;
export const comicsIdRatingApi = (comicId) => `/comics/${comicId}/rating`;
export const comicsIdChaptersApi = (comicId) => `/comics/${comicId}/chapters`;
export const comicsIdBookmarkApi = (comicId) => `/comics/${comicId}/bookmark`;
export const comicsIdCommentsApi = (comicId) => `/comics/${comicId}/comments`;

// Chapter
export const chaptersApi = () => `/chapters`;
export const chaptersIdApi = (chapterId) => `/chapters/${chapterId}`;
export const chaptersIdViewsApi = (chapterId) => `/chapters/${chapterId}/views`;
export const chaptersIdImagesApi = (chapterId) =>
  `/chapters/${chapterId}/images`;

// Genre
export const genresApi = () => `/genres`;

// Comment
export const commentApi = () => `/comments`;
export const commentReplyApi = () => `/comments/reply`;
export const commentIdApi = (commentId) => `/comments/${commentId}`;
export const commentIdCommentRepliesApi = (commentId) =>
  `/comments/${commentId}/comment-replies`;
export const commentIdLikeDislikeApi = (commentId) =>
  `/comments/${commentId}/like-dislike`;
