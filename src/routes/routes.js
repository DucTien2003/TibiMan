import Home from '@/pages/Home';
import Comic from '@/pages/Comic';
import MyUpload from '@/pages/MyUpload';
import Chapter from '@/pages/Chapter';
import Login from '@/pages/auth/Login';
import ComicList from '@/pages/ComicList';
import Register from '@/pages/auth/Register';
import UploadComic from '@/pages/UploadComic';
import ResetPassword from '@/pages/auth/ResetPassword';
import UpdatePassword from '@/pages/auth/UpdatePassword';
import ForgotPassword from '@/pages/auth/ForgotPassword';

import { AuthLayout } from '@/layouts';
import { homeUrl } from './urlStructure';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/:comicName/:comicId', component: Comic },
  { path: '/comic-list', component: ComicList },
  {
    path: '/:comicName/:comicId/:chapterName/:chapterId',
    component: Chapter,
    headerAbsolute: true,
  },

  // Upload
  { path: '/upload', component: MyUpload },
  {
    path: '/upload/comic',
    component: UploadComic,
    headerAbsolute: true,
  },
  {
    path: '/upload/comic/:comicId',
    component: UploadComic,
    headerAbsolute: true,
  },

  // Auth
  { path: '/login', component: Login, layout: AuthLayout },
  { path: '/register', component: Register, layout: AuthLayout },
  { path: '/reset-password', component: ResetPassword, layout: AuthLayout },
  { path: '/update-password', component: UpdatePassword, layout: AuthLayout },
  { path: '/forgot-password', component: ForgotPassword, layout: AuthLayout },
];

const privateRoutes = [{ path: 'admin', component: 'Admin' }];

export { publicRoutes, privateRoutes };
