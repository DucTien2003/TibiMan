// View pages
const homeUrl = () => "/";
const uploadUrl = () => "/upload";
const comicListUrl = () => "/comic-list";
const uploadComicUrl = () => "/upload/comic";
const detailComicUrl = (comicId = ":comicId") => `/upload/comic/${comicId}`;
const comicUrl = (comicId = ":comicId") => `/${comicId}`;
const chapterUrl = (comicId = ":comicId", chapterId = ":chapterId") =>
  `/${comicId}/${chapterId}`;

// Auth pages
const loginUrl = () => "/login";
const registerUrl = () => "/register";
const resetPasswordUrl = () => "/reset-password";
const updatePasswordUrl = () => "/update-password";
const forgotPasswordUrl = () => "/forgot-password";

export {
  chapterUrl,
  comicListUrl,
  comicUrl,
  detailComicUrl,
  forgotPasswordUrl,
  homeUrl,
  loginUrl,
  registerUrl,
  resetPasswordUrl,
  updatePasswordUrl,
  uploadComicUrl,
  uploadUrl,
};
