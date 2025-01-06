import { formatPath } from '@/utils';

// View pages
const homeUrl = () => '/';
const uploadUrl = () => '/upload';
const comicListUrl = () => '/comic-list';
const uploadComicUrl = () => '/upload/comic';
const editComicUrl = (comicId) => `/upload/comic/${comicId}`;
const comicUrl = (comicName, comicId) => `/${formatPath(comicName)}/${comicId}`;
const chapterUrl = (comicName, comicId, chapterName, chapterId) =>
  `/${formatPath(comicName)}/${comicId}/${formatPath(chapterName)}/${chapterId}`;

// Auth pages
const loginUrl = () => '/login';
const registerUrl = () => '/register';
const resetPasswordUrl = () => '/reset-password';
const updatePasswordUrl = () => '/update-password';
const forgotPasswordUrl = () => '/forgot-password';

export {
  homeUrl,
  loginUrl,
  comicUrl,
  uploadUrl,
  chapterUrl,
  registerUrl,
  comicListUrl,
  editComicUrl,
  uploadComicUrl,
  resetPasswordUrl,
  updatePasswordUrl,
  forgotPasswordUrl,
};
