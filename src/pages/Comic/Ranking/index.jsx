import { useState, useMemo } from "react";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import { comicsApi } from "@/api";
import { useGetData } from "@/hooks";

export default function Ranking() {
  const [rankingType, setRankingType] = useState("day");

  const handleChange = (event, newValue) => {
    setRankingType(newValue);
  };

  // Apis
  const staticApis = useMemo(
    () => [
      { url: comicsApi(), query: { limit: 5, orderBy: "views" } },
      { url: comicsApi(), query: { limit: 5, orderBy: "views" } },
      { url: comicsApi(), query: { limit: 5, orderBy: "views" } },
    ],
    []
  );

  const staticResponse = useGetData(staticApis);

  if (staticResponse.error || staticResponse.loading) {
    return;
  }

  const [comicsOfday, comicsOfmonth, topComics] =
    staticResponse.responseData || [];

  const rankData = [
    { comics: comicsOfday.comics, title: "Top ngày", value: "day" },
    { comics: comicsOfmonth.comics, title: "Top tháng", value: "month" },
    { comics: topComics.comics, title: "Top all", value: "all" },
  ];
  return (
    <TabContext value={rankingType}>
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
      {rankData.map((data, index) => (
        <TabPanel key={index} value={data.value}>
          <div>
            {data.comics.map((comic, index) => {
              return (
                <div key={index} className="w-full">
                  <DetailCard comic={comic} />
                </div>
              );
            })}
          </div>
        </TabPanel>
      ))}
    </TabContext>
  );
}
