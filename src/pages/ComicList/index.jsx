import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { comicsApi } from "@/api";
import DetailCard from "@/components/common/cards/DetailCard";
import GenresSelector from "@/components/specific/GenresSelector";
import PaginationComponent from "@/components/specific/PaginationComponent";
import { useGetData } from "@/hooks";
import { homeUrl } from "@/routes";
import { FaArrowLeft } from "@/utils";

const NUMBER_OF_COMICS_PER_PAGE = 18;

function ComicList() {
  // States
  const [currentPage, setCurrentPage] = useState(1);

  // Hooks
  const [params, setSearchParams] = useSearchParams();

  // variables
  const orderBy = params.get("orderBy") || "orderBy";
  const page = params.get("page") || 1;

  // Functions
  const handlePageChange = (event, value) => {
    setSearchParams({
      page: value,
      orderBy,
    });
    setCurrentPage(value);
  };

  //  Hooks
  const staticApis = useMemo(
    () => [
      {
        url: comicsApi(),
        query: {
          page,
          limit: NUMBER_OF_COMICS_PER_PAGE,
          orderBy,
          sortType: "DESC",
        },
      },
    ],
    [page, orderBy]
  );

  const staticResponse = useGetData(staticApis);

  if (staticResponse.loading || staticResponse.error) {
    return (
      <h2 className="mt-16 w-full text-center">
        {staticResponse.error || "Loading..."}
      </h2>
    );
  }

  const [comics] = staticResponse.responseData || [];

  return (
    <div className="my-20">
      <div className="container">
        {/* Back */}
        <Link
          to={homeUrl()}
          className="hover-theme-primary-text inline-flex items-center rounded-lg border px-4 py-2 font-semibold">
          <FaArrowLeft />
          <h5 className="ml-2">Back to Home</h5>
        </Link>

        {/* Filter */}
        <div className="mt-10 flex items-center justify-between">
          <h1 className="theme-primary-text">Comic list</h1>
          <div className="w-[400px]">
            <GenresSelector id="filter" label="Filter" />
          </div>
        </div>

        {/* Display */}
        <div className="mt-10 grid grid-cols-6 gap-5 pb-12">
          {comics.comics.map((comic, index) => {
            return (
              <div key={index}>
                <DetailCard comic={comic} />
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex w-full justify-center">
          <PaginationComponent
            size="large"
            currentPage={currentPage}
            itemPerPage={NUMBER_OF_COMICS_PER_PAGE}
            count={comics.count}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ComicList;
