import clsx from "clsx";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";

import AppIconButton from "@/components/common/buttons/AppIconButton";
import { homeUrl } from "@/routes";
import { useSideBarStore, sideBarActions } from "@/store";
import {
  GoPeople,
  FaDiscord,
  AiFillHome,
  PiBookOpen,
  FaXTwitter,
  BsPinAngle,
  FaFacebook,
  FaRedditAlien,
  ChevronLeftIcon,
  ChevronRightIcon,
  FiBookmark,
} from "@/utils";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const list = [
  {
    title: "Follows",
    icon: FiBookmark,
    items: [
      { id: "1", title: "Updates", to: "/" },
      { id: "2", title: "Library", to: "/" },
      { id: "3", title: "MDLists", to: "/" },
      { id: "4", title: "MyGroups", to: "/" },
      { id: "5", title: "Reading History", to: "/" },
    ],
  },
  {
    title: "Titles",
    icon: PiBookOpen,
    items: [
      { id: "6", title: "Advanced Search", to: "/" },
      { id: "7", title: "Recently Added", to: "/" },
      { id: "8", title: "Latest Updates", to: "/" },
      { id: "9", title: "Random", to: "/" },
    ],
  },
  {
    title: "Community",
    icon: GoPeople,
    items: [
      { id: "10", title: "Forums", to: "/" },
      { id: "11", title: "Groups", to: "/" },
      { id: "12", title: "Users", to: "/" },
    ],
  },

  {
    title: "MangaDex",
    icon: BsPinAngle,
    items: [
      { id: "13", title: "Support Us", to: "/" },
      { id: "14", title: "Site Rules", to: "/" },
      { id: "15", title: "Announcements", to: "/" },
      { id: "16", title: "About Us", to: "/" },
    ],
  },
];

const socials = [
  {
    name: "Discord",
    icon: FaDiscord,
    to: "/",
  },
  {
    name: "Twitter",
    icon: FaXTwitter,
    to: "/",
  },
  {
    name: "Reddit",
    icon: FaRedditAlien,
    to: "/",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    to: "/",
  },
];

function DrawerContent() {
  const theme = useTheme();
  const [, sideBarDispatch] = useSideBarStore();

  const [id, setId] = useState("0");

  return (
    <div className="theme-white-10-bg">
      <DrawerHeader className="flex w-full !justify-between !pl-4">
        <Link to={homeUrl()} className="flex items-center">
          <img
            src="https://mangadex.org/img/brand/mangadex-logo.svg"
            alt="logo img"
            className="mr-1"
          />
          <img
            src="https://mangadex.org/img/brand/mangadex-wordmark.svg"
            alt="logo text"
          />
        </Link>
        <AppIconButton
          onClick={() => sideBarDispatch(sideBarActions.hiddenSideBar())}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </AppIconButton>
      </DrawerHeader>

      <List className="!px-4 !py-2 text-sm">
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            className={clsx("flex items-center !rounded-lg !py-1", {
              "!theme-primary-bg !text-white": id === "0",
            })}
            onClick={() => setId("0")}>
            <AiFillHome className="text-2xl" />
            <span className="ml-2 mt-1 !font-bold">Home</span>
          </ListItemButton>
        </ListItem>
      </List>

      {list.map((item, index) => {
        return (
          <Fragment key={index}>
            <Divider />
            <List className="!px-4 !py-2 text-sm">
              {/* Title */}
              <ListItem className="flex items-center px-4 py-1">
                <item.icon className="text-2xl" />
                <span className="ml-2 mt-1 !font-bold">{item.title}</span>
              </ListItem>

              {/* List */}
              {item.items.map((subItem, subIndex) => {
                return (
                  <ListItem key={subIndex} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={subItem.to}
                      className={clsx(
                        {
                          "!theme-primary-bg font-medium !text-white":
                            id === subItem.id,
                        },
                        "!py-5px !rounded-lg"
                      )}
                      onClick={() => setId(subItem.id)}>
                      <span className="ml-2">{subItem.title}</span>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Fragment>
        );
      })}

      <div className="mx-auto mt-8 w-4/5">
        <a
          href="https://www.facebook.com/profile.php?id=100055239219530"
          target="_blank"
          rel="noreferrer"
          className="">
          <img
            src="https://mangadex.org/img/namicomi/support-dex-chan-1.png"
            alt="img"
          />
        </a>
        <Divider className="!my-4" />
      </div>

      <div className="flex items-center justify-center py-4">
        {socials.map((social, index) => {
          const Icon = social.icon;
          return (
            <Link to={social.to} key={index} className="mx-3">
              <Icon className="text-2xl" title={social.name} />
            </Link>
          );
        })}
      </div>

      <div className="mb-3 flex flex-col items-center justify-center text-xs">
        <span>v2024.5.24</span>
        <span>© MangaDex 2024</span>
      </div>
    </div>
  );
}

export default DrawerContent;
