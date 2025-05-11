import { useEffect } from "react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { comicsApi } from "@/api";
import BackTitle from "@/components/common/buttons/BackTitle";
import InfoCard from "@/components/common/cards/InfoCard";
import FilterForm from "@/components/specific/FilterForm";
import PaginationComponent from "@/components/specific/PaginationComponent";
import { useGetData } from "@/hooks";
import { getUrlParams } from "@/utils";

const NUMBER_OF_COMICS_PER_PAGE = 18;

function SearchResult() {
  // Hooks
  const [params, setSearchParams] = useSearchParams();

  // Variables
  const { search, page, order, status, genres, orderBy } = getUrlParams(params);

  // States
  const [currentPage, setCurrentPage] = useState(Number(page));

  // Functions
  const handlePageChange = (event, value) => {
    // Cập nhật page
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", value);
      return newParams;
    });
    setCurrentPage(value);
  };

  useEffect(() => {
    setCurrentPage(Number(page));
  }, [page]);

  const staticApis = useMemo(
    () => [
      {
        url: comicsApi(),
        query: {
          page,
          search,
          status,
          orderBy,
          order: order,
          genres: genres,
          limit: NUMBER_OF_COMICS_PER_PAGE,
        },
      },
    ],
    [search, page, orderBy, order, status, genres]
  );

  const { loading, error, responseData } = useGetData(staticApis);
  const [listComics] = responseData;

  if (loading || error) {
    return (
      <h2 className="mt-16 w-full text-center">
        {error ? `Error: ${error}` : "Loading..."}
      </h2>
    );
  }

  return (
    <div className="relative mb-10 mt-20">
      <div className="container">
        {/* Back */}
        <BackTitle title={`Tìm kiếm: "${search}"`} />

        {/* Filter */}
        <FilterForm />

        {/* List Comics */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {listComics.comics.map((comic) => (
            <InfoCard key={comic.id} comic={comic} isUser={true} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex w-full justify-center">
          <PaginationComponent
            size="large"
            currentPage={currentPage}
            itemPerPage={NUMBER_OF_COMICS_PER_PAGE}
            count={listComics.count}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
