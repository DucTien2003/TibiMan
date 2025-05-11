import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Divider from "@mui/material/Divider";
import Tab from "@mui/material/Tab";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { comicsApi } from "@/api";
import Cover from "@/components/common/Cover";
import { useGetData } from "@/hooks";
import { comicUrl } from "@/routes";
import {
  FaRegClock,
  FaRegStar,
  FiBookmark,
  MdOutlineRemoveRedEye,
  timeAgo,
} from "@/utils";

export default function Ranking() {
  const [rankingType, setRankingType] = useState("day");

  const handleChange = (event, newValue) => {
    setRankingType(newValue);
  };

  // Apis
  const staticApis = useMemo(
    () => [
      {
        url: comicsApi(),
        query: { limit: 5, orderBy: "views", order: "DESC" },
      },
      {
        url: comicsApi(),
        query: { limit: 5, orderBy: "views", order: "ASC" },
      },
      {
        url: comicsApi(),
        query: { limit: 5, orderBy: "views", order: "DESC" },
      },
    ],
    []
  );

  const { loading, error, responseData } = useGetData(staticApis);
  const [comicsOfDay, comicsOfMonth, topComics] = responseData || [];

  if (loading || error) {
    return (
      <h2 className="mt-16 w-full text-center">{error || "Loading..."}</h2>
    );
  }

  const rankData = [
    { comics: comicsOfDay.comics, title: "Top ngày", value: "day" },
    { comics: comicsOfMonth.comics, title: "Top tháng", value: "month" },
    { comics: topComics.comics, title: "Top all", value: "all" },
  ];
  return (
    <TabContext value={rankingType}>
      {/* Tabs */}
      <TabList
        className="bg-theme-gray-800 rounded"
        onChange={handleChange}
        aria-label="Bảng xếp hạng">
        {rankData.map((data, index) => (
          <Tab
            className="w-1/3"
            key={index}
            label={data.title}
            value={data.value}
          />
        ))}
      </TabList>

      <div className="py-2">
        <Divider />
      </div>

      {/* Tab data */}
      {rankData.map((data, index) => (
        <TabPanel key={index} value={data.value} className="!px-0 !pb-2 !pt-0">
          {data.comics.map((comic, index) => {
            return (
              <div key={index} className="w-full">
                <Link
                  to={comicUrl(comic.id)}
                  className="bg-theme-gray-800-hover parent-hover flex gap-2 rounded px-2 py-1">
                  {/* Cover */}
                  <div className="w-[75px]">
                    <Cover comic={comic} />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h4
                        className="theme-primary-main-parent-hover limit-line-2 font-bold leading-6"
                        title={comic.name}>
                        {comic.name}
                      </h4>
                      <p className="theme-gray-200 limit-line-1 text-sm">
                        {comic.author}
                      </p>
                    </div>

                    {/* Comment - View - Release date */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex gap-2.5">
                        <div className="flex items-center gap-0.5">
                          <MdOutlineRemoveRedEye />
                          {comic.views}
                        </div>
                        <div className="flex items-center gap-0.5">
                          <FaRegStar />
                          {comic.rating}
                        </div>
                        <div className="flex items-center gap-0.5">
                          <FiBookmark />
                          {comic.bookmarks}
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-xs">
                        <FaRegClock />
                        {timeAgo(comic.updatedAt)}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Divider */}
                {index !== data.comics.length - 1 && (
                  <div className="py-2">
                    <Divider />
                  </div>
                )}
              </div>
            );
          })}
        </TabPanel>
      ))}
    </TabContext>
  );
}
