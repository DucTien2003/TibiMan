import { useMemo } from "react";
import { Link } from "react-router-dom";

import Banner from "@/components/specific/Banner";
import SwiperComponent from "@/components/specific/SwiperComponent";
import DetailCard from "@/components/common/cards/DetailCard";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import { comicsApi } from "@/api";
import { useGetData } from "@/hooks";
import { comicListUrl } from "@/routes";

function Home() {
  const staticApis = useMemo(
    () => [
      { url: comicsApi(), query: { limit: 5, orderBy: "views" } },
      { url: comicsApi(), query: { limit: 18, orderBy: "created_at" } },
      { url: comicsApi(), query: { limit: 18, orderBy: "created_at" } },
    ],
    []
  );

  const staticResponse = useGetData(staticApis);

  if (staticResponse.loading) {
    return <h2 className="mt-16 w-full text-center">Loading...</h2>;
  }

  if (staticResponse.error) {
    return (
      <h2 className="mt-16 w-full text-center">
        Error: {staticResponse.error}
      </h2>
    );
  }

  const [mostPopularComics, latestUpdateComics, recentlyAddedComics] =
    staticResponse.responseData || [];

  return (
    <div>
      {/* Banner */}
      <div className="pb-8">
        <Banner comics={mostPopularComics.comics} />
      </div>

      {/* Latest updates */}
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Latest Updates</h2>
          <Link to={comicListUrl()}>
            <DefaultButton variant="outlined">Read more</DefaultButton>
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-6 gap-5 pb-12">
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
            <DefaultButton variant="outlined">Read more</DefaultButton>
          </Link>
        </div>

        <div className="mt-5">
          <SwiperComponent
            comicList={recentlyAddedComics.comics}
            numberOfSlides={5}
            cardType="description"
          />
        </div>
      </div>

      {/* Recently Added */}
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Recently Added</h2>
          <Link to={comicListUrl()}>
            <DefaultButton variant="outlined">Read more</DefaultButton>
          </Link>
        </div>

        <div className="mt-5">
          <SwiperComponent
            comicList={recentlyAddedComics.comics}
            numberOfSlides={6}
            gap={20}
            cardType="monotonic"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
