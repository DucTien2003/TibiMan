import { useMemo } from "react";
import { Link } from "react-router-dom";

import { comicsApi } from "@/api";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import DetailCard from "@/components/common/cards/DetailCard";
import SwiperComponent from "@/components/specific/SwiperComponent";
import { useGetData, useWindowResize } from "@/hooks";
import { comicListUrl } from "@/routes";

function Home() {
  const { isMobile, isTablet } = useWindowResize();

  const staticApis = useMemo(
    () => [
      { url: comicsApi(), query: { limit: 18, orderBy: "created_at" } },
      { url: comicsApi(), query: { limit: 18, orderBy: "created_at" } },
    ],
    []
  );

  const staticResponse = useGetData(staticApis);

  if (staticResponse.loading || staticResponse.error) {
    return (
      <h2 className="mt-16 w-full text-center">
        {staticResponse.error || "Loading..."}
      </h2>
    );
  }

  const [latestUpdateComics, recentlyAddedComics] =
    staticResponse.responseData || [];

  return (
    <div>
      {/* Latest updates */}
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Mới cập nhật</h2>
          <Link
            to={{
              pathname: comicListUrl(),
              search: "?orderBy=created_at",
            }}>
            <DefaultButton variant="outlined">Xem tất cả</DefaultButton>
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 pb-12 md:grid-cols-4 md:gap-5 lg:grid-cols-6">
          {latestUpdateComics.comics.map((comic, index) => {
            return (
              <div key={index} className="w-full">
                <DetailCard comic={comic} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Staff Picks */}
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Staff Picks</h2>
          <Link to={comicListUrl()}>
            <DefaultButton variant="outlined">Xem tất cả</DefaultButton>
          </Link>
        </div>

        <div className="mt-5">
          <SwiperComponent
            comicList={recentlyAddedComics.comics}
            cardType="description"
            numberOfSlides={isMobile ? 3 : isTablet ? 4 : 5}
            gap={isMobile ? 12 : isTablet ? 20 : 28}
          />
        </div>
      </div>

      {/* Recently Added */}
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Recently Added</h2>
          <Link to={comicListUrl()}>
            <DefaultButton variant="outlined">Xem tất cả</DefaultButton>
          </Link>
        </div>

        <div className="mt-5">
          <SwiperComponent
            comicList={recentlyAddedComics.comics}
            numberOfSlides={isMobile ? 3 : isTablet ? 5 : 6}
            gap={isMobile ? 12 : isTablet ? 20 : 28}
            cardType="monotonic"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
