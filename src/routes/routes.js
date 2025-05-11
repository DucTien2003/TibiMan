import { AuthLayout, PageComicsLayout } from "@/layouts";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";
import UpdatePassword from "@/pages/auth/UpdatePassword";
import Chapter from "@/pages/Chapter";
import Comic from "@/pages/Comic";
import ComicList from "@/pages/ComicList";
import Home from "@/pages/Home";
import MyBookmark from "@/pages/MyBookmark";
import MyUpload from "@/pages/MyUpload";
import SearchResult from "@/pages/SearchResult";
import UploadComic from "@/pages/UploadComic";

import {
  bookmarksUrl,
  chapterUrl,
  comicListUrl,
  comicUrl,
  detailComicUrl,
  forgotPasswordUrl,
  homeUrl,
  loginUrl,
  registerUrl,
  resetPasswordUrl,
  searchResultUrl,
  updatePasswordUrl,
  uploadComicUrl,
  uploadUrl,
} from "./urlStructure";

const publicRoutes = [
  // View pages
  { path: homeUrl(), component: Home, layout: PageComicsLayout },
  { path: comicUrl(), component: Comic },
  { path: comicListUrl(), component: ComicList },
  { path: bookmarksUrl(), component: MyBookmark },
  { path: searchResultUrl(), component: SearchResult },
  {
    path: chapterUrl(),
    component: Chapter,
    headerAbsolute: true,
  },

  // Upload
  { path: uploadUrl(), component: MyUpload },
  {
    path: uploadComicUrl(),
    component: UploadComic,
    headerAbsolute: true,
  },
  {
    path: detailComicUrl(),
    component: UploadComic,
    headerAbsolute: true,
  },

  // Auth
  { path: loginUrl(), component: Login, layout: AuthLayout },
  { path: registerUrl(), component: Register, layout: AuthLayout },
  { path: resetPasswordUrl(), component: ResetPassword, layout: AuthLayout },
  { path: updatePasswordUrl(), component: UpdatePassword, layout: AuthLayout },
  { path: forgotPasswordUrl(), component: ForgotPassword, layout: AuthLayout },
];

const privateRoutes = [{ path: "admin", component: "Admin" }];

export { privateRoutes, publicRoutes };
