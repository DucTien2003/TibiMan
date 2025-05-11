import clsx from "clsx";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import userAvatar1 from "@/assets/images/user-avatar-1.png";
import ThemeMode from "@/components/layout/Header/ThemeMode";
import { useDropdown } from "@/hooks";
import { bookmarksUrl, loginUrl, registerUrl, uploadUrl } from "@/routes";
import { authActions, useAuthStore } from "@/store";
import {
  CiSettings,
  FaRegBell,
  FiBookmark,
  FiLogIn,
  FiLogOut,
  FiUpload,
  FiUser,
  FiUserPlus,
  LuHistory,
} from "@/utils";

function UserMenu() {
  const [authState, authDispatch] = useAuthStore();

  const userMenuList = [
    // { title: "My profile", icon: FiUser, to: "/" },
    { title: "My Bookmarks", icon: FiBookmark, to: bookmarksUrl() },
    { title: "My History", icon: LuHistory, to: "/" },
    { title: "Upload Comic", icon: FiUpload, to: uploadUrl() },
    // { title: "My Settings", icon: CiSettings, to: "/" },
    // { title: "Announcements", icon: FaRegBell, to: "/" },
  ];

  const isLogin = localStorage.getItem("accessToken");
  const authInfo = isLogin ? authState : {};

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    authDispatch(authActions.logout());
  };

  const { isShowDropdown, dropdownRef, setIsShowDropdown } = useDropdown();

  return (
    <div
      ref={dropdownRef}
      className="relative flex justify-center text-black"
      onClick={() => setIsShowDropdown(!isShowDropdown)}>
      <span>
        <img
          src={isLogin && authInfo.avatar ? authInfo.avatar : userAvatar1}
          alt="user avatar"
          className="theme-white-10-bg flex size-10 cursor-pointer items-center justify-center rounded-full object-cover"
        />
      </span>

      <div
        className={clsx(
          { flex: isShowDropdown, hidden: !isShowDropdown },
          "theme-white-10-bg absolute right-0 top-full min-w-64 flex-col rounded p-2 shadow-lg"
        )}>
        {/* avatar */}
        <Link
          to="/"
          className="hover-theme-white-20-bg theme-primary-border cursor-pointer rounded border-b py-2">
          <div className="text-center">
            <img
              src={isLogin && authInfo.avatar ? authInfo.avatar : userAvatar1}
              alt="avatar"
              className="mx-auto size-28 rounded-full object-cover"
            />
            <h4 className="mt-2 font-medium">
              {isLogin && authInfo.name ? authInfo.name : "Guest"}
            </h4>
          </div>
        </Link>

        {/* Options */}
        <div className="flex flex-col">
          {isLogin ? (
            <Fragment>
              {/* Theme mode */}
              <ThemeMode />
              {userMenuList.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    to={item.to}
                    className="hover-theme-white-20-bg hover-theme-primary-text flex w-full items-center rounded p-3">
                    <Icon className="mr-2" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}

              <Link
                to={loginUrl()}
                className="hover-theme-white-20-bg hover-theme-primary-text flex w-full items-center rounded p-3"
                onClick={handleLogOut}>
                <FiLogOut className="mr-2" />
                <span>Sign out</span>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              {/* Theme mode */}
              <ThemeMode />
              <Link
                to={loginUrl()}
                className="hover-theme-white-20-bg hover-theme-primary-text flex w-full items-center rounded p-3">
                <FiLogIn className="mr-2" />
                <span>Login</span>
              </Link>
              <Link
                to={registerUrl()}
                className="hover-theme-white-20-bg hover-theme-primary-text flex w-full items-center rounded p-3">
                <FiUserPlus className="mr-2" />
                <span>Register</span>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
